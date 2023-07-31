import jwt from "jsonwebtoken";

import Usuarios from "../models/Usuarios.js";

const checkAuth = async (req, res, next) => {
  //Entro checkout
  
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
     
      token = req.headers.authorization.split(" ")[1];
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      
      req.usuario = await Usuarios.findById(decoded._id).select(
        "-password -token -confirmado"
      );
      
      return next();
      // manda al otro middleware que este en la ruta (autenticacion o perfil)
    } catch (error) {
      const e = new Error("Token no válido");
      res.status(403).json({ msg: e.message });
    }
  }
  if (!token) {
    const error = new Error("Token no válido o inexistente");
    return res.status(403).json({ msg: error.message });
  }

  next();
};

export default checkAuth;