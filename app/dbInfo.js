try {
  const { Client } = require("pg");
  const client = new Client(process.env.PROD_DB);
  client.connect();
  module.exports = client;
} catch (error) {
  console.log("an error occured here");
}
