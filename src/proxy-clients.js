class ProxyClients {
  #proxyClients;

  constructor() {
    this.#proxyClients = {};
  }

  add(name, proxyClient) {
    this.#proxyClients[name] = proxyClient;
  }

  writeOn(name, response) {
    this.#proxyClients[name].write(response);
  }

  getUserName(proxyClient) {
    const entries = Object.entries(this.#proxyClients);
    const socketEntry = entries.find((entry) => entry[1] === proxyClient);
    return socketEntry[0];
  }
}

module.exports = { ProxyClients };
