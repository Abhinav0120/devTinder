const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {

        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ['ignore', 'interested'];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: 'Invalid status type: '+ status});
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message: 'User not found'});
        }

        // if there is already a request between the two users, then return the request
        const existingRequest = await ConnectionRequest.findOne({
           $or:[
            {fromUserId, toUserId},
            {fromUserId: toUserId, toUserId: fromUserId},
           ] 
        });
        if(existingRequest){
            return res.status(400).json({message: 'Request already exists'});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({message: `${status} request sent successfully to ${toUser.firstName} ${toUser.lastName}`, data});

    }catch (error){
        return res.status(400).send('Error : '+ error.message);
    }
})

module.exports = requestRouter;