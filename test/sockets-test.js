const assert = require("assert");
const { describe, it } = require("node:test");
const { Sockets } = require("../src/sockets");

describe("Sockets", () => {
  describe("writeOn", () => {
    it("should write message to the given users' socket", (context) => {
      const write = context.mock.fn();
      const sockets = new Sockets();
      const name = "sauma";

      sockets.add(name, { write });
      console.log(sockets, write.mock);
      const message = "hello";
      sockets.writeOn(name, message);

      const actualResponse = write.mock.calls[0].arguments[0];
      const expectedResponse = { status: "message", message };
      assert.deepStrictEqual(actualResponse, expectedResponse);
    });
  });

  describe("getUserName", () => {
    it("should give the user name associated with the given socket", () => {
      const socket1 = { write: "write function" };
      const socket2 = { write: "another write function" };
      const sockets = new Sockets();
      const name1 = "sauma";
      const name2 = "vidita";

      sockets.add(name1, socket1);
      sockets.add(name2, socket2);

      const actualName = sockets.getUserName(socket2);
      const expectedName = "vidita";
      assert.strictEqual(actualName, expectedName);
    });
  });
});
