class Users {
  #users;

  constructor() {
    this.#users = [];
  }

  addUser(user) {
    this.#users.push(user);
  }

  isPresent(userName) {
    return this.#users.some((user) => user.name === userName);
  }

  getUserByName(userName) {
    return this.#users.find((user) => user.name === userName) || null;
  }

  isUserConnected(userName) {
    const user = this.getUserByName(userName);
    return user ? user.connected : false;
  }

  fetchMessages(userName) {
    const user = this.getUserByName(userName);
    return user.messages.map((message) => {
      return { sender: message.sender, text: message.text };
    });
  }
}

module.exports = { Users };
