const express = require('express');
const app = express();


app.get("/user", (req, res) =>{
    res.send({firstName: "FirstName", lastName: "LastName"})
})

app.post("/user", (req, res) =>{
    console.log('Save the data to the database');
    res.send('Data saved Successfully to the database');
})

app.delete("/user", (req, res) =>{
    console.log("Deleted Successfully")
    res.send('Data deleted Successfully')
})

app.use("/hello", (req, res) =>{
    res.send('Hellow Hellow')
})

// app.use("/", (req, res) => {
//     res.send("Namaste!")
// })

app.use("/test", (req, res)=>{
    res.send('Hellow from the server');
})

app.listen(5000, ()=>{
    console.log('Server is Successfully listening on the port 5000');
});


