const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('role').custom( esRoleValido ),
  validarCampos
] ,usuariosPut);

router.post("/", [
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check('email', 'El correo no es válido').isEmail(), // isEmail() es una función de express-validator y tambien es un middleware
  check('email').custom( emailExiste ), // custom es una función de express-validator y tambien es un middleware
  check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  // check('role', 'El rol es obligatorio').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( esRoleValido ),
  validarCampos
] ,usuariosPost);

router.delete("/:id", [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
] ,usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;