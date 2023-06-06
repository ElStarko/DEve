require('dotenv').config();  // Load environment variables from .env file
require('express-async-errors');  // Handle asynchronous errors in Express
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());  // Parse JSON request bodies

// extra packages

// routes
app.use('/api/v1/auth', authRouter);  // Mount the authRouter at the /api/v1/auth endpoint

app.use(notFoundMiddleware);  // Middleware to handle 404 Not Found errors
app.use(errorHandlerMiddleware);  // Middleware to handle other errors

const port = process.env.PORT || 3000;  // Use the PORT environment variable or default to 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);  // Connect to the MongoDB database using the MONGODB_URI environment variable
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();  // Start the server
