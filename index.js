const fs = require("fs");
const path = require("path");
const dns = require("node:dns/promises");
const { Winston } = require("./Winston");
const { WinstonSocketServer } = require("./WinstonSocketServer");
require("dotenv").config();
let serverOptions = {};
let config = {};
let fqdn = "winston.services";
if (!process.env.WINSTON_SERVER_HOST) {
  if (
    fs.existsSync(path.resolve(path.join(__dirname, "settings", "config.json")))
  ) {
    config = require(path.resolve(
      path.join(__dirname, "settings", "config.json")
    ));
  }
} else {
  config.fqdn = process.env.WINSTON_SERVER_HOST;
  if (
    fs.existsSync(path.resolve(path.join(__dirname, "settings", "config.json")))
  ) {
    let _config = require(path.resolve(
      path.join(__dirname, "settings", "config.json")
    ));
    config = { ...config, ..._config };
  }
}
serverOptions.fqdn = config.fqdn || fqdn;
if (config.hasOwnProperty("ssl")) {
  let sslDefaultCredentials = {};
  if (config.ssl.hasOwnProperty("default")) {
    sslDefaultCredentials = config.ssl.default;
    serverOptions.ssl.default = sslDefaultCredentials;
  }
  let vhostSSLCredentials = [
    {
      hostname: `winston.services`,
      cert: undefined,
      ca: undefined,
      key: undefined
    },
    {
      hostname: `www.winston.services`,
      cert: undefined,
      ca: undefined,
      key: undefined
    }
  ];
  if (config.ssl.hasOwnProperty("credentials")) {
    vhostSSLCredentials = config.ssl.credentials;
    serverOptions.ssl.credentials = vhostSSLCredentials;
  }
}

const main = async () => {
  try {
    const hostDNS = await dns.resolveTxt(serverOptions.fqdn);
    // serverOptions.address: "0x",
    console.log(hostDNS);
  } catch (error) {
    console.error(error);
  }
  const server = new WinstonSocketServer(serverOptions);
  new Winston(server);

};
main();
