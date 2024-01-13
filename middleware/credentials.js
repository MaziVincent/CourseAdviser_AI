const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {

    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){

        res.header('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin','*');
         res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
         res.setHeader('Access-Control-Allow-Headers','Content-Type','Authorization');

    }
    next();
}

module.exports = credentials;

