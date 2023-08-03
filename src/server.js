const net = require("node:net");
const { Users } = require("./users");
const { ProxyClients } = require("./proxy-clients");
const { ChatServer } = require("./chat-server");
const { Messages } = require("./messages");

const main = () => {
  const server = net.createServer();
  const users = new Users();
  const proxyClients = new ProxyClients();
  const messages = new Messages();
  const port = 8000;

  server.listen(port, () => console.log("chat server started listening"));

  const chatServer = new ChatServer(server, users, proxyClients, messages);
  chatServer.start();
};

main();
