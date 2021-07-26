const { User, Admin } = require("../../db.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//------------ IMPORTACION MAIL -----------------
const secret = 'test';
const { transporter } = require("../../../mailer");
//--------------------------------------------------

// Path of this controller --> Put(http://localhost:3001/loggings/loggingIn)
module.exports = async (req, res, next) => {

    let { email, password } = req.body;

    let userType;
    
    try {
        let userRegistered = await User.findOne(
            { 
                where: { email } 
            }
        );
        if(!userRegistered){

            userRegistered = await Admin.findOne(
                { 
                    where: { email } 
                }
            );
        }     
        if (!userRegistered) return res.status(404).json({ message: { message: "Usuario no existente", styles: "red" } });

        userRegistered instanceof Admin ? userType = "admin": null;
        userRegistered instanceof User ? userType = "tenant": null;
        
        const isPasswordCorrect = await bcrypt.compare(password, userRegistered.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: { message: 'Contraseña Incorrecta', style: "red" } });
        
        let first_logging = userRegistered.firstLogging;
        const token = jwt.sign({ email: userRegistered.email, id: userRegistered.id, userType }, secret, { expiresIn: '50d' });

        if(first_logging){ 
                   
            res.status(201).json({ token, message: { message: "Ingreso Exitoso ", style: "red" }, first_logging,id:userRegistered.id, name: userRegistered.name });

      /*       if(userRegistered.password != password){ */
                
                // await User.update({
                //     firstLogging: false,
                // }, {
                //     where: {
                //         id: userRegistered.id
                //     }
                // });
            }
           /*  } */
        else{

            res.status(201).json({ token, message: { message: "Ingreso Exitoso ", style: "red" }, first_logging,id:userRegistered.id, name: userRegistered.name });
        }

    } 
    catch (error) {

        res.status(500).json({ message: { message: 'Algo salió mal', style: "red" } });
        console.log(error);
    }
}