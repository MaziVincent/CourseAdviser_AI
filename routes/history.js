const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController')
const ROLES_LIST = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles')

/*
router.route('/')
    .post(verifyRoles(ROLES_LIST.Student), chatController.handleChatHistoryCreate)
    .put(verifyRoles(ROLES_LIST.Student), chatController.updateChatHistory)
    .get(verifyRoles(ROLES_LIST.Student), chatController.getChatHistory) */

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Student), chatController.getChatHistory)


module.exports = router;
