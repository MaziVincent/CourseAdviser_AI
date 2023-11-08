

const User = require('../models/User')
const jwt = require('jsonwebtoken');
const {generateAccessToken} = require('../services/generateToken')

const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;
    //check if there is a cookie called refreshToken
    console.log(cookies.refreshToken)
    if(!cookies.refreshToken) return res.sendStatus(401);

    const refreshToken = cookies.refreshToken;
    //check if user exist
    const foundStudent = await User.findOne({refreshToken}).exec();
    if(!foundStudent) return res.sendStatus(403); //forbidden
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err || foundStudent.email !== decoded.email) return res.sendStatus(403);
            
            const roles = Object.values(foundStudent.roles);
            //create jwt
        const accessToken = generateAccessToken(foundStudent.email, roles)
        res.json({accessToken})
        }
    );

}

module.exports = {handleRefreshToken}