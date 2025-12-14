const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth = async (req, res, next) => {
    // read the token from the req cookies

    try{
        const {token} = req.cookies;
        if(!token) throw new Error('token is not valid!');
        const decodeObj = await jwt.verify(token, 'DevTender');
        const {_id} = decodeObj; 
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found")
        } 
        req.user = user;
        next()
    } catch(error){
        res.status(400).send("Error: "+ error.message);
    }
    
    // validate the token
    // Find the user
}

module.exports = { userAuth};