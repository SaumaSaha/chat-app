const { Message } = require("./message");
const { User } = require("./user");
const { ProxyClient } = require("./proxy-client");

class ChatServer {
  #server;
  #users;
  #sockets;
  #messages;

  constructor(server, users, sockets, messages) {
    this.#server = server;
    this.#users = users;
    this.#sockets = sockets;
    this.#messages = messages;
  }

  #isNotValidMessageRequest(request) {
    return !this.#users.isPresent(request.to) || request.from === request.to;
  }

  #isNotValidCommandRequest(request) {
    return !(
      request.message === "connect" ||
      request.message === "disconnect" ||
      this.#users.isPresent(request.to)
    );
  }

  #sendMessage(request) {
    const sender = this.#users.getUserByName(request.from);
    const receiver = this.#users.getUserByName(request.to);
    const message = new Message(request.message, sender.name);
    this.#messages.addMessage(sender.name, receiver.name, message);

    [sender, receiver].forEach((user) => {
      const response = {
        sender: request.from,
        status: "sent",
        requestHandled: true,
        for: "send-message",
        message: request.message,
      };

      this.#sockets.writeOn(user.name, response);
    });
  }

  #createOrModifyUser(name) {
    if (this.#users.isPresent(name)) {
      const user = this.#users.getUserByName(name);
      user.changeConnectionStatus();
      return;
    }
    const user = new User(name);
    this.#users.addUser(user);
  }

  #onConnect(request, proxyClient) {
    const messages = this.#messages.getChatOf(request.from, request.to);
    const response = {
      sender: request.to,
      status: "connected",
      requestHandled: true,
      for: "command",
      message: messages,
    };

    proxyClient.write(response);
  }

  #onDisconnect(request, proxyClient) {
    const response = {
      sender: null,
      status: "disconnected",
      requestHandled: true,
      for: "command",
      message: "Command Mode",
    };

    proxyClient.write(response);
  }

  #handleRegistration(name, proxyClient) {
    if (this.#users.isUserConnected(name)) {
      const response = {
        sender: null,
        status: "registration-error",
        requestHandled: false,
        for: "registration",
        message: "User already connected\n",
      };
      proxyClient.write(response);
      return;
    }

    this.#createOrModifyUser(name);
    this.#sockets.add(name, proxyClient);
    this.#messages.addUser(name);

    const response = {
      sender: null,
      status: "registered",
      requestHandled: true,
      for: "registration",
      message: `Hello ${name}\n`,
    };

    proxyClient.write(response);
  }

  #handleMessage(request, proxyClient) {
    if (this.#isNotValidMessageRequest(request)) {
      const response = {
        sender: null,
        status: "invalid-receiver",
        requestHandled: false,
        for: "send-message",
        message: "Receiver not found or sending to yourself\n",
      };
      proxyClient.write(response);
      return;
    }

    this.#sendMessage(request);
  }

  #handleDisconnection(proxyClient) {
    const userName = this.#sockets.getUserName(proxyClient);
    const user = this.#users.getUserByName(userName);
    user.changeConnectionStatus();
  }

  #handleCommand(request, proxyClient) {
    if (this.#isNotValidCommandRequest(request)) {
      const response = {
        sender: null,
        status: "invalid-command",
        requestHandled: false,
        for: "command",
        message: "invalid command or reciever not present",
      };

      proxyClient.write(response);
      return;
    }

    const commandLookUp = {
      connect: (request, proxyClient) => this.#onConnect(request, proxyClient),
      disconnect: (request, proxyClient) =>
        this.#onDisconnect(request, proxyClient),
    };

    commandLookUp[request.message](request, proxyClient);
  }

  start() {
    this.#server.on("connection", (socket) => {
      const proxyClient = new ProxyClient(socket);

      const onRegistration = (request) => {
        this.#handleRegistration(request.from, proxyClient);
      };

      const onMessage = (request) => {
        this.#handleMessage(request, proxyClient);
      };

      const onDisconnection = () => {
        this.#handleDisconnection(proxyClient);
      };

      const onCommand = (request) => {
        this.#handleCommand(request, proxyClient);
      };

      const callBackLookup = {
        registration: onRegistration,
        command: onCommand,
        "send-message": onMessage,
        onDisconnection,
      };

      proxyClient.start(callBackLookup);
    });
  }
}

module.exports = { ChatServer };
