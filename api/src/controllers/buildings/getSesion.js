const { User, Admin } = require("../../db.js");
const jwt = require('jsonwebtoken');

//------------ IMPORTACION MAIL -----------------
const secret = 'test';
//--------------------------------------------------


module.exports = async (req, res, next) => {
    
    try {

        console.log('param', req.params)

        const { token } = req.params;

        console.log('token', token)

        decodedData = jwt.verify(token, secret);

        console.log('decodedData', decodedData)

        res.status(200).json({ decodedData });

    } 
    catch (error) {

        res.status(500).json({ message: { message: 'Algo salió mal', style: "red" } });
    }
}