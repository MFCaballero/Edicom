const jwt = require('jsonwebtoken');

const secret = 'test';

module.exports = async (req, res, next) => {
    
    try {  

        const { token } = req.params;

        decodedData = jwt.verify(token, secret);

        res.status(200).json(decodedData);

    } 
    catch (error) {
        next(error)
        res.status(500).json({ message: { message: 'Algo salió mal', style: "red" } });
    }
}