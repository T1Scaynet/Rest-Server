const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema ({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es necesaria']
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    // enum: ['USER_ROLE', 'ADMIN_ROLE', 'VENTAS_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

// Funcion para que no se muestren los campos password y __V en la respuesta del JSON
usuarioSchema.methods.toJSON = function() {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
}

module.exports = model('Usuario', usuarioSchema);