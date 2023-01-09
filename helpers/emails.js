import nodemailer from 'nodemailer'


export const emailRegistro = async (datos) => {
    const {email, nombre, token} = datos

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });


      //Informacion del email

      const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Confirma tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `<p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
        <p>Tu cuenta ya está casi lista solo debes comprobarla en el siguiente enlace: </p>

        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Activar cuenta</a>

        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
      })
}


export const emailOlvidePassword = async (datos) => {
  const {email, nombre, token} = datos



  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });


    //Informacion del email

    const info = await transport.sendMail({
      from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
      to: email,
      subject: "UpTask - Restablece tu contraseña",
      text: "Restablece tu contraseña",
      html: `<p>Hola: ${nombre} has solicitado cambiar tu contraseña</p>
      <p>Sigue el siguiente enlace para generar una nueva contraseña: </p>

      <a href="${process.env.FRONTEND_URL}/nuevo-password/${token}">Restablecer contraseña</a>

      <p>Si tu no solicitaste este cambio, puedes ignorar el mensaje</p>
      `
    })
}


