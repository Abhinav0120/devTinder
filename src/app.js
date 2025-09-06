const express = require('express');
const app = express();

app.get("/user/:userID/:userName/:password", (req, res) => {
    console.log(req.params);
    res.send('Hiiiii');
  });

app.listen(5000, ()=>{
    console.log('Server is Successfully listening on the port 5000');
});


