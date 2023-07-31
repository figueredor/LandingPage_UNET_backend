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
    const { email, nombre, token } = datos;

    // Enviar email
    const info = await transporter.sendMail({
        from: "Maestría en Gerencia de Empresas Agrícolas",
        to: email,
        subject: "Comprueba tu cuenta",
        text: "Comprueba tu cuenta",
        html: `<p>Hola: ${nombre}, comprueba tu cuenta </p>
      <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
      <a href="${process.env.FRONTEND_URL}/usuario/confirmar/${token}">Comprobar Cuenta</a></p>
      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
      `
    })
    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro;