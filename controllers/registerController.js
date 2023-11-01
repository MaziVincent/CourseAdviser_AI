
const studentsDb = {
    students:require('../models/students.json'),
    setStudents(data){this.students = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handleNewStudent = async (req, res) => {

    const { firstname, lastname, studentId, phoneNumber,gender, email, password } = req.body;

    if(!email || !password) return res.status(400).json({'message' : 'username and password required'});
    //check for dupicate student

    const duplicate = studentsDb.students.find(std => std.email === email);

    if(duplicate) return res.sendStatus(409);

    try{
        //encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        //
    }
}
