const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://abhinav:kGGUisFqx9lskuWe@cluster0.utpuuft.mongodb.net/devTinder"
    )
}

module.exports = connectDB;

// connectDB()
//     .then(() =>{
//         console.log('Database connected Successfully');
//     })
//     .catch((err) =>{
//         console.log('Database cannot be connected!!');
//     })