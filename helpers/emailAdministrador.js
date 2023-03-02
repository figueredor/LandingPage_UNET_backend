import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_POR,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { email, nombre, telefono, pais, mensaje } = datos;

    // Enviar email
    const info = await transporter.sendMail({
        from: "Maestría en Gerencia de Empresas Agrícolas",
        to: 'maestriagerenciaempresasagricolas@gmail.com',
        subject: "Nuevo Registro",
        text: "Nuevo Registro Satisfactorio",
        html: 
        `<p>El siguiente estudiante ha realizado un pre-registro: </p>
        <p>Nombre: ${nombre} </p>
        <p>Correo: ${email} </p>
        <p>Teléfono: ${telefono} </p>
        <p>País: ${pais} </p>
        <p>Mensaje: ${mensaje} </p>
      <p>Recuerde responder pronto</p>
      
      `
    })
    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro;