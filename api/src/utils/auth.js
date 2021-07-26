const jwt = require('jsonwebtoken');
const secret = 'test';

const auth = async(req,res,next) => {
    try{
        
        const token = req.headers?.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedData;
        
        // if(token && isCustomAuth){


        if(token){
            decodedData = jwt.verify(token, secret);
            req.user = { id: decodedData?.id, userType: decodedData?.userType };
        }

        
        // else {
        //     decodedData = jwt.decode(token);
        //     req.user = { id: decodedData?.sub, userType: decodedData?.userType};
        // }
        // console.log('decodeData', decodedData)
        next();
    } catch(error) {
        console.log(error);
    }
};

module.exports = auth;