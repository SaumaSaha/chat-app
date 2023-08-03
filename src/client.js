const net = require("node:net");
const { App } = require("./app");

const main = () => {
  const port = 8000;
  const connection = net.createConnection(port);
  const inputStream = process.stdin;
  const outputStream = process.stdout;

  connection.setEncoding("utf-8");
  inputStream.setEncoding("utf-8");

  const app = new App(connection, inputStream, outputStream);
  app.start();
};

main();
