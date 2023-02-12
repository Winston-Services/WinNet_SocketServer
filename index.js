import { readFile, access } from "fs/promises"
import { dirname, resolve, join } from "path"
import dns from "dns/promises"
import  Winston from "./Winston.js"
import WinstonSocketServer from "./WinstonSocketServer.js"
import dotenv from "dotenv"
import { fileURLToPath } from 'url';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let serverOptions = {};
let config = {};
let fqdn = "winston.services";
if (!process.env.WINSTON_SERVER_HOST) {
  const configPath = resolve(join(__dirname, "settings", "config.json"))

  try {
    await access(configPath)
    config = JSON.parse((await readFile(configPath)).toString());
  } catch {

  }
} else {
  config.fqdn = process.env.WINSTON_SERVER_HOST;
  try {
    await access(configPath)
    config = {
      ...config,
      ...JSON.parse((await readFile(configPath)).toString())
    }
  } catch {

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

// const main = async () => {
  try {
    const hostDNS = await dns.resolveTxt(serverOptions.fqdn);
    // serverOptions.address: "0x",
    console.log(hostDNS);
  } catch (error) {
    console.error(error);
  }
  const server = new WinstonSocketServer(serverOptions);
  new Winston(server);

// };
// main();
