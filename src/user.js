class User {
  #name;
  #connected;

  constructor(name) {
    this.#name = name;
    this.#connected = true;
  }

  get name() {
    return this.#name;
  }

  get connected() {
    return this.#connected;
  }

  changeConnectionStatus() {
    this.#connected = !this.#connected;
  }
}

module.exports = { User };
