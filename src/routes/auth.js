const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {validateSignUpData} = require('../utils/validation');

const authRouter = express.Router()

// Routes
authRouter.post('/signup', async (req, res) => {
    try {
        // Validation of data
        validateSignUpData(req);
        // Encript the password

        const {firstName, lastName, emailId, password} = req.body;

        // encryption
        const passwordHash = await bcrypt.hash(password, 10)
        console.log('passwordHash', passwordHash)

        // Store the user in the DB

        // console.log('req', req.body);
        console.log('Signup route hit');

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        await user.save();
        res.send('User added successfully');
    } catch (err) {
        console.error('ERROR : ', err);
        res.status(500).send(`Internal Server Error ${err}`);
    }
});

// Login
authRouter.post('/login', async (req, res) => {
    try{
        const {emailId, password} = req.body;
        // const isEmailValid = validator.isEmail(emailId);
        console.log('emailpass', emailId,)
        const user = await User.findOne({emailId: emailId})
        if(!user){
            throw new Error('Invalid Credentials.');
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
            // create a JWT token
            const token = await user.getJWT();
            console.log('appToken', token);

            // Add the token to the cookie and send the responce back to the user
            res.cookie('token', token, {
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            })
            res.send("Login Successfull!!");
        }else{
            throw new Error('Invalid Credentials.');
        }

    }catch(error){
        res.status(400).send('Error : '+ error.message);
    }
})

module.exports = authRouter;