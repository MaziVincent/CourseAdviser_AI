const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController')

router.post('/', registerController.handleNewStudent);
router.post('/admin', registerController.handleNewAdmin);

module.exports = router;
