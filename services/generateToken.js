
const jwt = require('jsonwebtoken');

const generateAccessToken = (email, roles) => {

    const accessToken = jwt.sign(
        {
            'userInfo':{
                'email':email,
                'roles':roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1d'}
    );

    return accessToken;

}


const generateRefreshToken = (email) => {

    const refreshToken = jwt.sign(
        {'email' : email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    );

    return refreshToken;
}

module.exports = {generateAccessToken, generateRefreshToken}