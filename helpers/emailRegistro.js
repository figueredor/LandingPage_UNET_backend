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
    const { email, nombre } = datos;

    // Enviar email
    const info = await transporter.sendMail({
        from: "Maestría en Gerencia de Empresas Agrícolas",
        to: email,
        subject: "Bienvenido",
        text: "Pre-registro Satisfactorio",
        html: `<p>Hola: ${nombre}, hemos realizado su registro </p>
      <p>Pronto se le estará informando sobre el proceso de inscripción, te invitamos a ingresar a la página de postgrado de la Universidad Nacional Experimental del Táchira, solo debes hacer clip en el siguiente enlace: 
      <a href="http://postgrado.unet.edu.ve/">Postgrado UNET</a></p>
      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
      `
    })
    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro;