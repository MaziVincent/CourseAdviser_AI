



const studentsDb = {
    students:require('../models/students.json'),
    setStudents(data){this.students = data}
}

const jwt = require('jsonwebtoken');
const {generateAccessToken} = require('../services/generateToken')

const handleRefreshToken = (req, res) => {

    const cookies = req.cookies
    //check if there is a cookie called refreshToken
    if(!cookies.refreshToken) return res.sendStatus(401);

    const refreshToken = cookies.refreshToken;
    //check if user exist
    const foundStudent = studentsDb.students.find(std => std.refreshToken === refreshToken);
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