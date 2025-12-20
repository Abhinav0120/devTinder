const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest')

// get all the pending connection requests for the logged in user
userRouter.get('/user/request/recieved', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: 'interested'
        }).populate('fromUserId', 'firstName lastName photoUrl about skills gender age')
        res.json({message: 'Pending connection requests recieved', connectionRequests})

    }catch (error){
        return res.status(400).send('ERROR: '+ error.message);
    }
})

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: 'accepted'},
                { fromUserId: loggedInUser._id, status: 'accepted'}
            ]
        }).populate('toUserId fromUserId', 'firstName lastName photoUrl abou skills gender age')

        const data = connections.map(connection => {
            if(connection.fromUserId.equals(loggedInUser._id)) {
                return connection.toUserId
            }else{
                return connection.fromUserId
            }
        })

        res.json({message: 'Connections', data})

    }catch (error) {
        return res.status(400).send('ERROR: ' + error.message );
    }
})

module.exports = userRouter;