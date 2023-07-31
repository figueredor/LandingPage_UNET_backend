import express  from "express";
import checkAuth from "../middleware/authMiddleware.js";
//import checkRolAuth from "../middleware/rolAuht.js";

const router = express.Router();
import { 
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
    eliminarUsuario 
} from "../controllers/usuariosController.js";



router.post('/', registrar);
router.get('/', checkAuth, obtenerUsuarios);
router.put('/:id', checkAuth, actualizarUsuario);
router.delete('/:id', checkAuth, eliminarUsuario);



router.get("/confirmar/:token", confirmar); 
router.post('/login',   autenticar);
router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

router.get('/perfil', checkAuth,  perfil);
router.post('/pre-registro', autenticar);
/*
router.route("/:id")
    .get(obtenerUsuario)
    .put(actualizarUsuario)
    .delete(eliminarUsuario)
    */
export default router;