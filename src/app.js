const express = require('express');
const app = express();
const {adminAuth, userAuth} = require('./middlewares/auth')



app.get('/user', userAuth, (req, res) => {
    throw new Error("error");
    // res.send('User Data sent');

})

app.use('/admin', adminAuth)

app.get("/admin/getAllData", (req, res) => {
    try{
        throw new Error("error");
        res.send('All Data Sent');
    } catch (err) {
        res.status(500).send("Some Error contact support team!");
    }
})

app.delete("/admin/deleteUser", (req, res) => {
    res.send('Dleted a User');
})

app.use("/", (err, req, res, next)=>{
    console.log('err', err)
    if(err){
        res.status(500).send("something went wrong!");
    }
})


app.listen(5000, ()=>{
    console.log('Server is Successfully listening on the port 5000');
});


