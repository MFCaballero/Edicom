const { Admin } = require("../../db.js");
const bcrypt = require('bcryptjs');

//obligatorio email password
//opcional name contact 

module.exports = async (req, res, next) => {
    let { name, contact, email, password } = req.body;
    if(password) var hashedPassword = await bcrypt.hash(password, 12);
    
    try
    {
        let User = await Admin.create({
            name: name || "Administrador",
            contact,
            email,
            password: hashedPassword,
            firstLogging: false
        });
        console.log(User)
        return res.status(200).json({succes: `Admin created successfully`});
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error creating the Admin"))
    }
};