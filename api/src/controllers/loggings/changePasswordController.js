const { User,Admin } = require("../../db.js");
const bcrypt = require('bcryptjs');

const secret = 'test';
const { transporter } = require("../../../mailer");


// Path of this controller --> Put(http://localhost:3001/loggings/changepassword)
module.exports = async (req, res, next) => {

    let {newPass, email} = req.body;

    console.log('email', email);
    
    try
    {
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
        const hashedPassword = bcrypt.hash(newPass, 12)
        hashedPassword.then(async (newPassHashed) => {
            console.log('DATOS contra ' , newPass)
            await userRegistered.update(
                {
                    password: newPassHashed,
                    firstLogging: false,
                }, 
                {
                    where: {
                        email: email
                    }
                }
            );

           

            
            return res.status(200);
        })
    }
    catch(err){
       /*  console.error(err); */
        res.json(err);
    }
};