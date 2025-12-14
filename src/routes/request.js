const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');

requestRouter.post("/request/send/interested/:userId", userAuth, async (req, res) => {
    const user = req.user;
    console.log('sending connection req!');
    res.send(user.firstName + 'sent the connection request!');
})

module.exports = requestRouter;