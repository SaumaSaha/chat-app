class Messages {
  #messages;

  constructor() {
    this.#messages = {};
  }

  addUser(name) {
    this.#messages[name] = this.#messages[name] ? this.#messages[name] : {};
  }

  addMessage(sender, receiver, message) {
    const previousChats = this.#messages[sender][receiver];
    if (!previousChats) {
      this.#messages[sender][receiver] = [];
      this.#messages[receiver][sender] = [];
    }

    this.#messages[sender][receiver].push(message);
    this.#messages[receiver][sender].push(message);
  }

  getChatOf(sender, receiver) {
    const messages = this.#messages[sender][receiver] || [];

    return messages.map((message) => {
      return { sender: message.sender, text: message.text };
    });
  }
}

module.exports = { Messages };
