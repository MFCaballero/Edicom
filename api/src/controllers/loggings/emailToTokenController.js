const { User, Admin } = require("../../db.js");
const jwt = require('jsonwebtoken');

const secret = 'test';

// Path of this controller --> Put(http://localhost:3001/spendings/add)
module.exports = async (req, res, next) => {
    
    try {  
        const { email } = req.body;
        const token = jwt.sign({ email: email }, secret, { expiresIn: '1hr' });

        res.status(201).json({ token: token});

    } 
    catch (error) {

        res.status(500).json({ message: { message: 'Algo salió mal', style: "red" } });
    }
}