require('dotenv').config();

const Server = require('./server/server');
const { dbConection } = require("./databases/config")

dbConection();

const server = new Server();
server.listen();