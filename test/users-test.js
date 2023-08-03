const assert = require("assert");
const { describe, it } = require("node:test");
const { Users } = require("../src/users");
const { User } = require("../src/user");

describe("Users", () => {
  describe("isPresent", () => {
    it("should give true if there is a user with the given user name", () => {
      const user1 = new User("sauma");
      const user2 = new User("vidita");
      const users = new Users();
      users.addUser(user1);
      users.addUser(user2);

      assert.strictEqual(users.isPresent("vidita"), true);
      assert.strictEqual(users.isPresent("sauma"), true);
    });

    it("should give false if there is no user with the given user name", () => {
      const user1 = new User("sauma");
      const user2 = new User("vidita");
      const users = new Users();
      users.addUser(user1);
      users.addUser(user2);

      assert.strictEqual(users.isPresent("riya"), false);
    });
  });

  describe("getUserByName", () => {
    it("should give the user with the given user name", () => {
      const user1 = new User("sauma");
      const user2 = new User("vidita");
      const users = new Users();
      users.addUser(user1);
      users.addUser(user2);

      assert.deepStrictEqual(users.getUserByName("vidita"), user1);
      assert.deepStrictEqual(users.getUserByName("sauma"), user2);
    });

    it("should give null if there is no user with the given user name", () => {
      const user1 = new User("sauma");
      const user2 = new User("vidita");
      const users = new Users();
      users.addUser(user1);
      users.addUser(user2);

      assert.deepStrictEqual(users.getUserByName("riya"), null);
    });
  });

  describe("isUserConnected", () => {
    it("should give true if the user is connected", () => {
      const user1 = new User("sauma");
      const user2 = new User("vidita");
      const users = new Users();
      users.addUser(user1);
      users.addUser(user2);

      assert.strictEqual(users.isUserConnected("sauma"), true);
    });

    it("should give false if user is not connected", () => {
      const user1 = new User("sauma");
      const user2 = new User("vidita");
      const users = new Users();
      users.addUser(user1);
      users.addUser(user2);
      user1.changeConnectionStatus();

      assert.deepStrictEqual(users.isUserConnected("sauma"), false);
    });
  });
});
