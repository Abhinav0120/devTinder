const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();
const PORT = 8080;

// Middleware to parse JSON request body
app.use(express.json());

// Routes
app.post('/signup', async (req, res) => {
  try {
    console.log('Signup route hit');

    const user = new User({
      firstName: "Abhinav",
      lastName: "Ajagekar",
      emailId: "test@gmail.com",
      password: "testPassword",
    });

    await user.save();
    res.send('User added successfully');
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Connect to DB and start server
connectDB()
  .then(() => {
    console.log('Database connected successfully...');
    app.listen(PORT, () => {
      console.log(`✅ Server is successfully listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('❌ Database cannot be created:', err);
  });
