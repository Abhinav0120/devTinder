const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8080;

// Middleware to parse JSON request body
app.use(express.json());
// Middleware to parse the incoming cookie header
app.use(cookieParser());

// Routes
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')

// Use Routes
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
// Connect to DB and start server
connectDB()
    .then(() => {
        console.log('Database connected successfully...');
        app.listen(PORT, () => {
            console.log(`✅ Server is successfully listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('❌ Database cannot be created:', err);
    });
