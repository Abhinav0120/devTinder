const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // this is the refrence to the User model
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    status: {
        type: String,
        required: true,
        enum: {
           values: ['ignore','interested', 'accepted', 'rejected'],
           message: `{VALUE} is incorrect status type`
        },
    }
}, {
    timestamps: true
});

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre('save', async function (next){
    const connectionRequest = this;
    // check if the fromUserId and toUserId are the same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error('You cannot send request to yourself!');
    }
    next();
})

const ConnectionRequestModel = new mongoose.model('ConnectionRequest', connectionRequestSchema);  

module.exports = ConnectionRequestModel;