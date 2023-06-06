const express = require('express');
const app = express();

// Available courses offered by the school
const availableCourses = [
  "Math",
  "Science",
  "English",
  "History",
  "Geography",
  "Computer Science",
];

// Route to get the list of available courses
app.get('/courses', (req, res) => {
  res.json(availableCourses);
});

// Route to add new courses
app.post('/courses', (req, res) => {
  const selectedCourses = req.body.courses;

  // Filter out invalid courses and add valid courses to the selectedCourses array
  const validCourses = selectedCourses.filter((course) =>
    availableCourses.includes(course)
  );

  // Add valid courses to the selectedCourses array in your database or storage
  // Implement your logic here

  res.json({ message: "Courses added successfully!" });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
