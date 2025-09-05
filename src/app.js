const express = require('express');
const app = express();

app.use("/", (req, res) => {
    res.send("Namaste!")
})

app.use("/hellow", (req, res) =>{
    res.send('Hellow Hellow')
})

app.use("/test", (req, res)=>{
    res.send('Hellow from the server');
})

app.listen(5000, ()=>{
    console.log('Server is Successfully listening on the port 5000');
});


