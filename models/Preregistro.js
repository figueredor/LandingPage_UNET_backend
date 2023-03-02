import mongoose from "mongoose";

const aspirantesSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            trim: true
        },
        telefono: {
            type: String,
            require: true,
            trim: true
        },
        pais: {
            type: String,
            require: true,
            trim: true
        },
        mensaje: {
            type: String,
            require: false,
            trim: true
        },
        condicion: {
            type: String,
            require: false,
            default: "Preregistro",
            trim: true
        },
        trimestreInicio: {
            type: String,
            require: false,
            trim: true
        },

    },{
        timestamps: true,
    });

const Aspirante = mongoose.model('Aspirante', aspirantesSchema);

export default Aspirante;