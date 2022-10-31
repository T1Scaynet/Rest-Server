const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find({})
  //   .skip( Number (desde))
  //   .limit( Number (limite));

  // const total = await Usuario.countDocuments();

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find({query})
      .skip( Number (desde))
      .limit( Number (limite)),
  ]);


  res.json({
    total,
    usuarios
  });
};

const usuariosPost = async(req, res = response) => {
  const { nombre, email, password, role } = req.body;

  // Lamar el modelo de usuario
  const usuario = new Usuario({nombre, email, password, role});
  
  // Encriptar contraseña
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);
  
  // Guardar el usuario en la base de datos
  await usuario.save();

  res.json({
    usuario
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body; 

  // Validar el password contra la base de datos
  if (password) {
    const salt = await bcrypt.genSalt(10);
    resto.password = await bcrypt.hash(password, salt);
  }

  // Buscar el ID del usuario
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  // Fisicamente eliminar el usuario de la base de datos
  // const usuario = Usuario.findByIdAndDelete(id);

  // Cambiar el estado del usuario a false para que no se muestre en la lista de usuarios
  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

  res.json({
    usuario
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};