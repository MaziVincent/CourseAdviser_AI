
const express = require('express')
const router = express.Router();
const studentController = require('../controllers/studentController');
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles')


router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), studentController.getStudents)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Student), studentController.getStudent)

module.exports = router;