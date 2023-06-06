const mongoose = require('mongoose');  // Import the Mongoose library for working with MongoDB
const bcrypt = require('bcryptjs');  // Import the bcrypt library for password hashing
const jwt = require('jsonwebtoken');  // Import the jsonwebtoken library for JWT generation

require('dotenv').config();  // Load environment variables from .env file

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],  // Name is required
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],  // Email is required
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,  // Email must be unique
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],  // Password is required
    minlength: 6,
  }
});

UserSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);  // Generate a salt for password hashing
  this.password = await bcrypt.hash(this.password, salt);  // Hash the password using bcrypt
});

UserSchema.methods.createJWT = function() {
  return jwt.sign(
    { userId: this._id, name: this.name },  // Payload data for the JWT (user ID and name)
    process.env.JWT_SECRET,  // JWT secret key from environment variable
    {
      expiresIn: process.env.JWT_LIFETIME,  // Expiration time for the JWT from environment variable
    }
  );
};

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);  // Compare the provided password with the hashed password
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);  // Create and export the User model based on the UserSchema
