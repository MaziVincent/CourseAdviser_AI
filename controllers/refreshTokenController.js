



const studentsDb = {
    students:require('../models/students.json'),
    setStudents(data){this.students = data}
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

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
             //create jwt
        const accessToken = jwt.sign(
            {'email' : foundStudent.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );
        res.json({accessToken})
        }
    );

}

module.exports = {handleRefreshToken}