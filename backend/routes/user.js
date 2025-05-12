const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/auth');

// Protect the route with authentication middleware
router.post('/', authMiddleware, userController.addUsers);

module.exports = router;
