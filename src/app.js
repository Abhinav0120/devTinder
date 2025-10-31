const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 8080;

// Middleware to parse JSON request body
app.use(express.json());

// Routes
app.post('/signup', async (req, res) => {
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

// get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    console.log('emailId', userEmail);

    try {
        const user = await User.findOne({ emailId: userEmail });
        console.log('users', user);
        if (!user) {
            res.status(404).send('user not found!');
        } else {
            res.send(user);
        }

    } catch (error) {
        res.status(400).send('something went wrong!');
    }

    // try{
    //     const users = await User.find({emailId: userEmail});
    //     console.log('users', users);
    //     if(users.length === 0){
    //         console.log(users.length)
    //         res.status(404).send('user not found!');
    //     }else {
    //         res.send(users);
    //     }

    // }catch(error){
    //     res.status(400).send('something went wrong!');
    // }

})


//Create API feed Get/feed All the users from the database. 
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(404).send('User not found!');
        }
        res.send(users);
    } catch (error) {
        res.status(400).send('something went wrong!');
    }
})

// delete user
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            res.status(403).send('user not found!');
        } else {
            res.send(`user ${user.firstName} ${user._id} delted successfully`);
        }
    } catch (error) {
        res.status(400).send('something went wrong!');
    }

})

// update user
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    // const ALLOWED_UPDATES = ['firstName', 'lastName', 'age', 'photoUrl', 'about', 'skills'];
    // const requestedUpdates = Object.keys(data);
    // const isValidOperation = requestedUpdates.every((update) => ALLOWED_UPDATES.includes(update));

    try {
        const ALLOWED_UPDATES = ['firstName', 'lastName', 'age', 'photoUrl', 'about', 'skills'];
        const isValidOperation = Object.keys(data).every((update) => ALLOWED_UPDATES.includes(update));

        if (!isValidOperation) {
            throw new Error('Invalid updates!');
        }
        if (data?.skills.length > 10) {
            throw new Error('Skills cannot be more than 10');
        }
        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument: 'before',
            runValidators: true
        });
        console.log('user', user);
        if (!user) {
            res.status(403).send('User not found!');
        } else {
            res.send('user updated successfully!');
        }
    } catch (error) {
        res.status(400).send('Update Failed: ' + error.message);
    }
})

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
