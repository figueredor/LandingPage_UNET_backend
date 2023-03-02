import Aspirante from "../models/Preregistro.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailRegistroAdministrador from "../helpers/emailAdministrador.js";

const agregarEstudiante = async (req, res) => {
    //console.log(req.body)
    const {email, nombre, telefono, pais, mensaje} = req.body;
    const estudiante = new Aspirante(req.body);

    try {
        const estudianteGuardado = await estudiante.save();

        emailRegistro({
            email,
            nombre
        });

        emailRegistroAdministrador({
            email,
            nombre,
            telefono,
            pais,
            mensaje
        })

        res.json(estudianteGuardado);

    } catch (error) {
        console.log(error);
    }
}

export {
    agregarEstudiante
}