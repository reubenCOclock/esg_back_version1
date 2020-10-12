require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.port;
const router = require("./app/router");
const router_v1 = require("./app/router_v1");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// recuperation des routes indiqué
app.use(router);
app.use(router_v1);

app.listen(3000, () => {
  console.log("server is listening");
  console.log("hello world");
});
