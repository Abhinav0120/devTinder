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
const userRouter = require('./routes/user');

// Use Routes
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter)

// Error handling middleware for JSON parsing errors and other errors
app.use((err, req, res, next) => {
    // Handle JSON parsing errors
    if (err instanceof SyntaxError && (err.status === 400 || err.statusCode === 400)) {
        return res.status(400).json({ 
            message: 'Invalid JSON format. Please ensure all property names and strings are in double quotes.',
            error: err.message 
        });
    }
    // Handle other errors
    console.error('Error:', err);
    res.status(err.status || err.statusCode || 500).json({ 
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

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
