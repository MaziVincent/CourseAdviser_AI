

const studentsDb = {
    students:require('../models/students.json'),
    setStudents(data){this.students = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {

    const {email, password} = req.body;
    //check if there is email and password
    if(!email || !password) return res.status(400).json({'message' : 'email and password required'})
    //check if user exist
    const foundStudent = studentsDb.students.find(std => std.email === email);
    if(!foundStudent) return res.sendStatus(401); //unauthorized
    //check password validity
    const match = await bcrypt.compare(password, foundStudent.password);

    if(!match){   

       return res.sendStatus(401);
    }

      //create jwt
      const accessToken = jwt.sign(
        {'email' : foundStudent.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30s'}
    );
    const refreshToken = jwt.sign(
        {'email' : foundStudent.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    );

    const otherStudents = studentsDb.students.filter(std => std.email !== foundStudent.email);
    const currentStudent = {...foundStudent, refreshToken}
    studentsDb.setStudents([...otherStudents,currentStudent]);
    await fsPromises(path.join(__dirname,'..','models','students.json'),
        JSON.stringify(studentsDb.students));

    res.cookie('refreshToken', refreshToken, {httpOnly:true, maxAge:24 * 60 * 60 * 1000});
    
    res.json({accessToken})



}

module.exports = {handleLogin}