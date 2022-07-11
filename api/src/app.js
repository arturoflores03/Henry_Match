if (process.env.NODE_ENV !== "produccion") {
  require("dotenv").config();
}
const express = require("express");

//ZAY: esta linea faltaba para mercadopago
//const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");

//Initializations
const server = express();

//Settings
server.set("port", process.env.PORT || 9000);

server.name = "API";

//MIDDLEWARES

server.use(cors());
// Data Parsing
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());

//ZAY: esta linea faltaba para mercadopago:
/* server.use(express.static(path.join(__dirname, "public"))); */

//HTTP request logger
server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // http://localhost:9000 // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
