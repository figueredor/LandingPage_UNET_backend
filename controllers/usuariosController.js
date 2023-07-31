//import jwt from "jsonwebtoken";
import Usuarios from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js";
//import generarJWT from "../helpers/generarJWT.js";
//import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
//import emailRegistro from "../helpers/emailRegistro.js";

const registrar = async (req, res) => {
  const { email, nombre } = req.body;
  const img = req.file;
  console.log(img);
  const existeUsuario = await Usuarios.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  const usuario = new Usuarios(req.body);

  try {
    const usuarioGuardado = await usuario.save();
    res.json(usuarioGuardado);

    emailRegistro({
      email,
      nombre,
      token: usuarioGuardado.token,
    });
  } catch (error) {
    console.log(error);
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Usuarios.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Toquen no válido");
    return res.status(404).json({ msg: error.message });
  }
  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Usuario Confirmado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  console.log("Entro autenticar backen ${email} y ${password}");
  // Comprobar si el usuario existe
  const usuario = await Usuarios.findOne({ email });
  //console.log(`usuario en autenticar ${usuario}`)

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }
  // Revisar password
  if (await usuario.comprobarPassword(password)) {
    // Autenticar al usuario
    /* usuario.token = generarJWT(usuario.id);*/

    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarJWT(usuario.id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {

  try {
    
    
    let token;
    token = req.headers.authorization.split(" ")[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.usuario = await Usuarios.findById(decoded.id).select(
      "-password -token -confirmado"
    );
    
    res.json(req.usuario);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    res.status(401).json({ mensaje: "Token inválido"});
  }

};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeUsuario = await Usuarios.findOne({ email });

  if (!existeUsuario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeUsuario.token = generarId();
    await existeUsuario.save();
    //console.log(`email controler ${email}`)
    emailOlvidePassword({
      email,
      nombre: existeUsuario.nombre,
      token: existeUsuario.token,
    });
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Usuarios.findOne({ token });

  if (tokenValido) {
    res.json({ msg: "Token válido y el usuario existe" });
  } else {
    const error = new Error("Token no válido");
    return res.status(400).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuarios.findOne({ token });
  if (!usuario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    usuario.token = null;
    usuario.password = password;
    await usuario.save();
    res.json({ msg: "Password modificado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuarios.find();
  res.json(usuarios);
};

const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuarios.findById(id);

  if (!usuario) {
    return res.status(404).json({ msg: "No encontrado" });
  } else {
    res.json(usuario);
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuarios.findById(id);

  if (!usuario) {
    return res.status(404).json({ msg: "No encontrado" });
  }

  try {
    await usuario.deleteOne();
    res.json({ msg: "Usuario borrado" });
  } catch (error) {
    console.log(error);
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuarios.findById(id);

  if (!usuario) {
    return res.status(404).json({ msg: "No encontrado" });
  }

  usuario.nombre = req.body.nombre || usuario.nombre;
  usuario.email = req.body.email || usuario.email;
  usuario.rol = req.body.rol || profesor.rol;

  try {
    const usuarioActualizado = await usuario.save();
    res.json(usuarioActualizado);
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  confirmar,
  autenticar,
  perfil,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
};