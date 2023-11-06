
const User = require('../models/User')

const bcrypt = require('bcrypt');


const handleNewStudent = async (req, res) => {

    const { firstname, lastname, studentId, phoneNumber,gender, email, password } = req.body;
    if(!firstname || !lastname ) return res.status(400).json({'message' : 'firstname and lastname required'});
    if(!studentId ) return res.status(400).json({'message' : 'student ID required'});
    if(!phoneNumber || !gender ) return res.status(400).json({'message' : 'Phonenumber and gender required'});
    if(!email || !password) return res.status(400).json({'message' : 'email and password required'});
    //check for dupicate student

    const duplicate = await User.findOne({email: email}).exec();

    if(duplicate) return res.sendStatus(409);

    try{
        //encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        //store the new student
        const newStudent = await User.create( {
                            'firstname':firstname,
                            'lastname':lastname,
                            'studentId':studentId,
                            'phoneNumber':phoneNumber,
                            'gender' : gender,
                            'email' : email,
                            'roles':{"Student": "Student"},
                            'password' : hashedPassword});

        console.log(newStudent);
        res.status(201).json({'success' : 'New student created successfully'});
    }catch(error){

        res.status(500).json({'message': error.message});
    }


}


const handleNewAdmin = async (req, res) => {

    const { firstname, lastname, email,phoneNumber, password } = req.body;
    if(!firstname || !lastname || !phoneNumber ) return res.status(400).json({'message' : 'firstname and lastname and phoneNumber required'});

    if(!email || !password) return res.status(400).json({'message' : 'email and password required'});
    //check for dupicate admin

    const duplicate = await User.findOne({email : email}).exec();

    if(duplicate) return res.sendStatus(409);

    try{
        //encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        //store the new student
        const newAdmin = await User.create({
                            'firstname':firstname,
                            'lastname':lastname,
                            'email' : email,
                            'phoneNumber':phoneNumber,
                            'roles':{'Admin' : 'Admin'},
                            'password' : hashedPassword
                        });
       
        console.log(newAdmin);
        res.status(201).json({'success' : 'New Admin created successfully'});
    }catch(error){

        res.status(500).json({'message': error.message});
    }


}

module.exports = {handleNewStudent, handleNewAdmin}
