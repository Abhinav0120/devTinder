const mongoose = require('mongoose');
const validator = require('validator');

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
            trim: true,
            validate(value) {
               if(!validator.isEmail(value)){
                throw new Error('Invalid Email Address: '+ value );
               }
            }
        },
        password: {
            type: String,
            required: true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error('Enter a Strong Password')
                } 
            }
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
            default: 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg',
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error('Invalid Photo URL: '+ value)
                }
            }
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