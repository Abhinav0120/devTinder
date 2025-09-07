const express = require('express');
const app = express();
const {adminAuth, userAuth} = require('./middlewares/auth')

app.get('/user', userAuth, (req, res) => {
    res.send('User Data sent');
})

app.use('/admin', adminAuth)

app.get("/admin/getAllData", (req, res) => {
    res.send('All Data Sent');
})

app.delete("/admin/deleteUser", (req, res) => {
    res.send('Dleted a User');
})

app.listen(5000, ()=>{
    console.log('Server is Successfully listening on the port 5000');
});


