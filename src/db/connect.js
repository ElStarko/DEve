const mongoose = require('mongoose');  // Import the Mongoose library for working with MongoDB

const connectDB = (url) => {
  // Function for connecting to the database
  return mongoose.connect(url, {
    useNewUrlParser: true,  // Use new URL parser
    useCreateIndex: true,  // Use index creation
    useFindAndModify: false,  // Disable find and modify operations (deprecated)
    useUnifiedTopology: true,  // Use new server discovery and monitoring engine
  });
};

module.exports = connectDB;  // Export the connectDB function to be used in other files
