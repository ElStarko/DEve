const User = require('../models/User');  // Import the User model from '../models/User'
const { StatusCodes } = require('http-status-codes');  // Import the StatusCodes object from 'http-status-codes' library
const { BadRequestError, UnauthenticatedError } = require('../errors/index');  // Import custom error classes

const register = async (req, res) => {
  // Registration endpoint
  const user = await User.create({ ...req.body });  // Create a new user based on the request body
  const token = user.createJWT();  // Generate a JSON Web Token (JWT) for the user
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });  // Respond with the created user's name and the generated token
};

const login = async (req, res) => {
  const { email, password } = req.body;  // Get the email and password from the request body

  if (!email || !password) {
    throw new BadRequestError('Please input email and password');  // Throw an error if email or password is missing
  }

  const user = await User.findOne({ email });  // Find a user with the provided email in the database
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');  // Throw an error if the user is not found
  }

  const isPasswordCorrect = await user.comparePassword(password);  // Compare the provided password with the user's hashed password
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');  // Throw an error if the password is incorrect
  }

  const token = user.createJWT();  // Generate a JSON Web Token (JWT) for the user

  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name }, userId: { _di: user._id }, token });  // Respond with the user's name, userId, and the generated token
};

module.exports = {
  register,
  login
};
