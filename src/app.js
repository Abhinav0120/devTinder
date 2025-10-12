const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();
const PORT = 8080;

// Middleware to parse JSON request body
app.use(express.json());

// Routes
app.post('/signup', async (req, res) => {
    // console.log('req', req.body);
  try {
    console.log('Signup route hit');

    const user = new User(req.body);

    await user.save();
    res.send('User added successfully');
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).send('Internal Server Error');
  }
});

// get user by email
app.get("/user", async (req, res)=>{
    const userEmail =  req.body.emailId;
    console.log('emailId', userEmail);

    try{
        const user = await User.findOne({emailId: userEmail});
        console.log('users', user);
        if(!user){
            res.status(404).send('user not found!');
        }else {
            res.send(user);
        }

    }catch(error){
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
    try{
        const users = await User.find({});
        if(users.length === 0){
            res.status(404).send('User not found!');
        }
        res.send(users);
    } catch(error){
        res.status(400).send('something went wrong!');
    }
})

// delete user
app.delete('/user', async (req, res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            res.status(403).send('user not found!');
        }else{
            res.send(`user ${user.firstName} ${user._id} delted successfully`);
        }
    }catch(error){
        res.status(400).send('something went wrong!');
    }

})

// update user
app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate(userId, data, {returnDocument: 'before'});
        console.log('user', user);
        if(!user){
            res.status(403).send('User not found!');
        }else {
            res.send('user updated successfully!');
        }
    } catch(error){
        res.status(400).send('something went wrong!')
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
