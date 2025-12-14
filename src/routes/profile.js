const express = require('express');
const {userAuth} = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');
const profileRouter = express.Router()
const bcrypt = require('bcrypt');

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }catch (error){
        return res.status(400).send('Error : '+ error.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;        
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();

        res.json({message: ` ${loggedInUser.firstName} Profile updated successfully!`, data: loggedInUser});


    }catch (error){
        return res.status(400).send('Error : '+ error.message);
    }
})

profileRouter.patch('/profile/password', userAuth, async (req, res) => {
    try {
        const {password, newPassword} = req.body
        const loggedInUser = req.user;
        const isPasswordValid = await loggedInUser.validatePassword(password);
        if(!isPasswordValid){
            throw new Error("Invalid Password");
        }
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = newPasswordHash;
        await loggedInUser.save();
        res.json({message: "Password Updated Successfully!"});
    }catch (error){
        return res.status(400).send('Error : '+ error.message);
    }
})
module.exports = profileRouter;