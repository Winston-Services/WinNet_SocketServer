import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import http from "http";
import vhost from "vhost";
import vhttps from "vhttps";
import serveIndex from "serve-index";
import { Server as SocketService } from "socket.io";
import Router from './api/router.js';
import("dotenv");
//.config();

class WinstonSocketServer {
  _primaryService = express();
  _httpServer;
  _httpsServer;
  _fqdn;
  _address;
  _verifier = {};
  get verifier() {
    return this._verifier;
  }
  set verifier(value) {
    this._verifier = value;
  }

  constructor(
    options = {
      fqdn: "winston.services",
      address: "0x",
      ssl: {
        default: {
          cert: undefined,
          ca: undefined,
          key: undefined
        },
        credentials: [
          {
            hostname: `winston.service`,
            cert: undefined,
            ca: undefined,
            key: undefined
          },
          {
            hostname: `www.winston.service`,
            cert: undefined,
            ca: undefined,
            key: undefined
          }
        ]
      }
    }
  ) {
    // console.log(options);
    if (options && options.hasOwnProperty("fqdn")) {
      this._fqdn = options.fqdn;
    }
    if (options && options.hasOwnProperty("address")) {
      this._address = options.address;
    }
    if (options && options.hasOwnProperty("ssl")) {
      if (options.ssl.hasOwnProperty("default")) {
        this._defaultSSLCredentials = options.ssl.default;
      }
      if (options.ssl.hasOwnProperty("credentials")) {
        this._SSLCredentials = options.ssl.credentials;
      }
    }
    this._primaryService.disable("x-powered-by");
    this._primaryService.use((req, res, next) => {
      res.setHeader("x-powered-by", "Winston Network v1.0");
      next();
    });
    const corsWhitelist = [this._fqdn, "www." + this._fqdn];

    function handleCorsDelegation(overrideCallback = null) {
      if (overrideCallback) {
        return overrideCallback;
      }
      return function(req, callback) {
        let corsOptions;
        if (corsWhitelist.indexOf(req.header("Origin")) !== -1) {
          corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
        } else {
          corsOptions = { origin: false }; // disable CORS for this request
        }
        callback(null, corsOptions); // callback expects two parameters: error and options
      };
    }

    // console.log("SSL ENABLED : ", process.env.NODEJS_WEBHOST_ENABLE_SSL);
    if (this._defaultSSLCredentials) {
      // console.log("SSL Sever Initiated");
      this._httpsServer = vhttps.createServer(
        this._defaultSSLCredentials,
        this._SSLCredentials,
        this._primaryService
      );
      this._httpServer = http.createServer(this._primaryService);
    } else {
      this._httpServer = http.createServer(this._primaryService);
    }

    this._vhostApp = express();
    this._vhostApp.disable("x-powered-by");
    this._vhostApp.set("X-Powered-By", "Winston Network v1.0");

    this._primaryService.options(
      "*",
      cors(function(req, callback) {
        callback(null, { origin: true });
      })
    );

    this._vhostApp.options(
      "*",
      cors(function(req, callback) {
        callback(null, { origin: true });
      })
    );
    
    this._vhostApp.use(
      cors(handleCorsDelegation()),
      express.json(),
      express.urlencoded({
        extended: true
      }),
      Router
    );
    this._vhostApp.use(
      cors(handleCorsDelegation()),
      express.json(),
      express.urlencoded({
        extended: true
      }),
      express.static("public", {
        dotfiles: "allow",
        redirect: false,
        index: "index.html"
      }),
      serveIndex("public/*", { icons: true })
    );

    this._vhostApp.get("/*", (req, res, next) => {
      //try base static files first
      const baseFilePath = req.path;
      // console.log("VHostRequest : ", baseFilePath);
      return res.sendFile(
        path.resolve(
          path.join("public", baseFilePath) //req.path
        )
      );
    });
    console.log("Loading Virtual Host");
    console.log("Loading " + this._fqdn);
    this._primaryService.use(vhost(this._fqdn, this._vhostApp));
    console.log("Loading Virtual Host Subdomain");
    this._primaryService.use(vhost(`www.${this._fqdn}`, this._vhostApp));
    if (this._httpsServer) {
      this._io = new SocketService(this._httpsServer);
    } else {
      this._io = new SocketService(this._httpServer);
      this._io.on("SERVICE_VERIFIER", client => {
        client.emit("SERVICE_VERIFIED", { verifier: { ...this._verifier } });
      });
    }
    return this;
  }
  listen() {
    if (this._defaultSSLCredentials) {
      this._httpsServer.listen(443, () => {
        console.log("Winston Secure Socket Server Started");
        console.log("Winston Secure API Server Started");
      });
    }
    this._httpServer.listen(80, () => {
      console.log("Winston Socket Server Started");
    });
  }
  verifier() {
    return "0x";
  }
}
export default WinstonSocketServer;
