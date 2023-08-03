class App {
  #client;
  #name;
  #inputStream;
  #outputStream;
  #registered;
  #commandMode;
  #connectedTo;

  constructor(client, inputStream, outputStream) {
    this.#name = "";
    this.#client = client;
    this.#inputStream = inputStream;
    this.#outputStream = outputStream;
    this.#registered = false;
    this.#commandMode = false;
    this.#connectedTo = "";
  }

  #display(data) {
    this.#outputStream.write(data);
  }

  #sendRequest(request) {
    this.#client.write(JSON.stringify(request));
  }

  #register(name) {
    this.#name = name;
    const request = {
      for: "registration",
      from: name,
      to: null,
      message: null,
    };
    this.#sendRequest(request);
  }

  #sendMessage(message) {
    if (message === ".disconnect") {
      const request = {
        for: "command",
        from: null,
        to: null,
        message: "disconnect",
      };

      this.#sendRequest(request);
      return;
    }
    const request = {
      for: "send-message",
      from: this.#name,
      to: this.#connectedTo,
      message,
    };

    this.#sendRequest(request);
  }

  #sendCommand(rawCommand) {
    const [command, user] = rawCommand.split(":");
    this.#connectedTo = user;

    const request = {
      for: "command",
      from: this.#name,
      to: user,
      message: command,
    };

    this.#sendRequest(request);
  }

  #onData() {
    this.#inputStream.on("data", (data) => {
      if (!this.#registered) {
        this.#register(data.trim());
      }
      if (this.#commandMode) {
        this.#sendCommand(data.trim());
      }
      if (this.#registered && !this.#commandMode)
        this.#sendMessage(data.trim());
    });
  }

  #onRequestHandled(response) {
    if (response.status === "registered") {
      this.#registered = true;
      this.#commandMode = true;
      this.#display(response.message);
    }

    if (response.status === "connected") {
      const messages = response.message;
      this.#commandMode = false;

      this.#outputStream.write("\x1bc");
      this.#display(`Connected to: ${response.sender}\n`);
      messages.forEach((message) => {
        this.#display(`${message.sender}: ${message.text}\n`);
      });
    }

    if (response.status === "sent" && !this.#commandMode) {
      const message = `${response.sender}: ${response.message}\n`;
      this.#display(message);
    }

    if (response.status === "disconnected") {
      this.#commandMode = true;
      this.#connectedTo = "";
      this.#outputStream.write("\x1bc");
      this.#display(response.message);
    }
  }

  #onResponse(data) {
    const response = JSON.parse(data);

    if (response.requestHandled) {
      this.#onRequestHandled(response);
      return;
    }

    this.#display(response.message);
  }

  start() {
    this.#outputStream.write("Enter your name: ");
    this.#client.on("connect", () =>
      this.#client.on("data", (data) => this.#onResponse(data))
    );
    this.#onData();
  }
}

module.exports = { App };
