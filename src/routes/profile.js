const express = require('express');
const {userAuth} = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');
const profileRouter = express.Router()

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
        console.log("loggedInUserBefore", loggedInUser);
        
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);
      
        console.log("loggedInUserAfter", loggedInUser);

        await loggedInUser.save();

        res.json({message: ` ${loggedInUser.firstName} Profile updated successfully!`, data: loggedInUser});


    }catch (error){
        return res.status(400).send('Error : '+ error.message);
    }
})
module.exports = profileRouter;