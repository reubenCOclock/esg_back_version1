const { Client } = require("pg");
const client = new Client(process.env.TESTDB);
client.connect();
module.exports = client;
