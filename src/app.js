const express = require('express');
const app = express();


// we can pass array of route handlers like
// app.use("/route", rh, [rh2, rh3], rh4, rh5)

app.use("/user", (req, res, next)=>{
    console.log('first route handler')
    // res.send("response from first route handler")
    next();
},
[(req, res, next)=>{
    console.log('second route handler')
    // res.send("response from second route handler")
    next()
},(req, res, next) => {
    console.log('third route handler')
    // res.send("response from third route handler")
    next()
}]
,(req, res, next)=>{
    console.log('fourth route handler')
    // res.send("response from fourth route handler")
    next()
},(req, res, next) => {
    console.log('fifth route handler')
    res.send("response from fifth route handler")
})

app.listen(5000, ()=>{
    console.log('Server is Successfully listening on the port 5000');
});


