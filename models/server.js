const express = require("express");

const server = express();
const { PORT } = process.env;
const usuariosPath = "/api/usuarios";

// Middlewares
server.use(express.json());
server.use(express.static("public"));

// Routes
server.use(usuariosPath, require("../routes/usuarios"));

module.exports = {
  server,
  PORT,
};