import express  from "express";

const router = express.Router();
import { agregarEstudiante } from "../controllers/preRegistroController.js";

router.post('/', agregarEstudiante)
    
export default router;