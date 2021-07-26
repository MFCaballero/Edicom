const jwt = require('jsonwebtoken');
const { User } = require("../../db.js");
const secret = 'test';
const { transporter } = require("../../../mailer");


module.exports = async (req, res, next) => {

    try {
        
        let { email } = req.body 

        let userRegistered = await User.findOne(
            { 
                where: { email } 
            }
        );

        if (!userRegistered) return res.status(404).json({ message: { message: "Usuario no existente", styles: "red" } });

        const token = jwt.sign({ email: userRegistered.email }, secret, { expiresIn: '1hr' });
        
        let foo = await transporter.sendMail({
            from: '"Edicom" <edicombuilds@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Recuperar Contraseña", // Subject line
            text: "Haga click en el link para restablecer su contraseña: ", // plain text body
            html: `<b>Haga click en el link para restablecer su contraseña: <a href="http://localhost:3000/logging/restaurarcontraseña?${token}"> Link </a> </b>`, // html body
        });

        // res.status(201).json({ token });
        res.status(201);

    } catch (error) {

        res.status(500).json({ message: { message: 'Algo salió mal', style: "red" } });
    }
}