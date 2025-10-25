const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50,
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            validate(value) {
                if (!['male', 'female', 'others'].includes(value)) {
                    throw new Error('Gender data is not valid');
                }
            }
        },
        photoUrl: {
            type: String,
            default: 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg'
        },
        about: {
            type: String,
            default: "this is default"
        },
        skills: {
            type: [String],
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema);