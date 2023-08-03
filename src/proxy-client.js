class ProxyClient {
  #socket;

  constructor(socket) {
    this.#socket = socket;
  }

  write(response) {
    this.#socket.write(JSON.stringify(response));
  }

  start(callBackLookup) {
    this.#socket.on("data", (data) => {
      const request = JSON.parse(data);
      console.log(request);

      callBackLookup[request.for](request);
    });

    this.#socket.on("end", callBackLookup.onDisconnection);
  }
}

module.exports = { ProxyClient };
