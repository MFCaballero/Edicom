const { User, Admin } = require("../../db.js");
const jwt = require('jsonwebtoken');

//------------ IMPORTACION MAIL -----------------
const secret = 'test';
//--------------------------------------------------

// Path of this controller --> Put(http://localhost:3001/spendings/add)
module.exports = async (req, res, next) => {
    
    try {  

        const { token } = req.body;

        decodedData = jwt.verify(token, secret)?.email;

        res.status(200).json({ mail: decodedData});

    } 
    catch (error) {

        res.status(500).json({ message: { message: 'Algo salió mal', style: "red" } });
    }
}