const validator = require("validator");

const validateSignUpData = (req) => {
   const {firstName, lastName, emailId, password} = req.body;

   if(!firstName || !lastName){
    throw new Error("Name is not Valid!");
   }else if(!validator.isEmail(emailId)){
    throw new Error("Email is not valid!")
   }else if(!validator.isStrongPassword(password)){
    throw new Error("Please Enter a strong Password!")
   }
}

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "age", "gender", "about", "skills"];
    console.log("allowedEditFields", allowedEditFields)
    console.log("Object.keys(req.body)", Object.keys(req.body))

    const isEditAllowed = Object.keys(req.body).every(key => allowedEditFields.includes(key))
    console.log("isEditAllowed", isEditAllowed)
    return isEditAllowed;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}