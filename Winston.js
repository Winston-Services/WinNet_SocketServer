import { WinstonStateBlock } from "./WinstonStateBlock";

class Winston {
  constructor(server) {
    this.nodes = [];
    this.node = server._fqdn;
    this.address = server._address;
    this.Server = () => {
      return server;
    };
    this.IO = () => {
      return server._io;
    };
    this.Server()._io.on("connect", client => {
      client.emit("connected", { fqdn: this.Server()._fqdn, id: client.id });
      client.on("identify", data => {
        client.emit("identified_as", {
          fqdn: this.node,
          address: this.address,
          id: client.id
        });
      });
      client.on('genesis', () => {
        client.emit('genesis', {
          fqdn: this.node,
          address: this.address,
          id: client.id,
          block: new WinstonStateBlock({address: '0x'})
        })
      })
    });
    this.Server().listen();
    return this;
  }
}
export { Winston as default }