
const studentsDb = {
    students:require('../models/students.json'),
    setStudents(data){this.students = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handleNewStudent = async (req, res) => {

    const { firstname, lastname, studentId, phoneNumber,gender, email, password } = req.body;
    if(!firstname || !lastname ) return res.status(400).json({'message' : 'firstname and lastname required'});
    if(!studentId ) return res.status(400).json({'message' : 'student ID required'});
    if(!phoneNumber || !gender ) return res.status(400).json({'message' : 'Phonenumber and gender required'});
    if(!email || !password) return res.status(400).json({'message' : 'email and password required'});
    //check for dupicate student

    const duplicate = studentsDb.students.find(std => std.email === email);

    if(duplicate) return res.sendStatus(409);

    try{
        //encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        //store the new student
        const newStudent = {'firstname':firstname,
                            'lastname':lastname,
                            'studentId':studentId,
                            'phoneNumber':phoneNumber,
                            'gender' : gender,
                            'email' : email,
                            'password' : hashedPassword};
        studentsDb.setStudents([...studentsDb.students, newStudent]);
        await fsPromises.writeFile(path.join(__dirname, '..','models','students.json'), JSON.stringify(studentsDb.students));
        console.log(studentsDb.students);
        res.status(201).json({'success' : 'New student created successfully'});
    }catch(error){

        res.status(500).json({'message': error.message});
    }


}

module.exports = {handleNewStudent}
