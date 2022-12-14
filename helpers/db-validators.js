const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido =  async(role = '') => {
  const existeRol = await Role.findOne({ role });

  if (!existeRol) {
    throw new Error(`El rol ${ role } no existe en la base de datos`);
  }
}

const emailExiste =  async(email = '') => {
  // Verificar si el email existe en la base de datos
  const existeEmail = await Usuario.findOne({email});
  if (existeEmail) {
    throw new Error(`El email ${ email } ya existe en la base de datos`);
  }
}

const existeUsuarioPorId = async( id ) => {

  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con el ID ${ id } no existe en la base de datos`);
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId
}