const express = require('express');  // Import the Express framework
const router = express.Router();  // Create an instance of the Express Router

const { login, register } = require('../controllers/auth');  // Import the login and register controllers from '../controllers/auth'

// Define routes
router.post('/register', register);  // POST route for user registration
router.post('/login', login);  // POST route for user login

module.exports = router;  // Export the router to be used in other files
