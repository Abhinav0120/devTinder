const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.post('/signup', async (req, res) => {
    // Creating a new instance of the user model
    const user = new User({
        firstName: "Abhinav",
        lastName: "Ajagekar",
        emailId: "test@gmail.com",
        password: "testPassword",
    })

    await user.save();
})


connectDB()
    .then(()=>{
        console.log('Database connected Successfully...')
        app.listen(5000, ()=>{
            console.log('Server is Successfully listening on the port 5000');
        });
    })
    .catch((err)=>{
        console.log('Database cannot be created!!');
    })




