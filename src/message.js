class Message {
  #text;
  #sender;

  constructor(text, sender) {
    this.#text = text;
    this.#sender = sender;
  }

  get text() {
    return this.#text;
  }

  get sender() {
    return this.#sender;
  }
}

module.exports = { Message };
