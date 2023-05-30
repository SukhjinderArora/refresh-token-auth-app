const path = require('path');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

const { PORT, NODE_ENV } = process.env;

const isDev = NODE_ENV === 'development';

const app = express();

if (isDev) {
    app.use(
        cors({
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200,
            credentials: true,
        })
    );
}

app.use(express.json({ type: 'application/json' }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
   console.error("\x1b[31m", error);
   if (res.headersSent) {
        return next(error);
    }
    return res.status(error.status || 500).json({
        error: {
            status: error.status || 500,
            message: error.status ? error.message : "Internal Server Error",
        },
    });
});

app.listen(PORT || 5000, (error) => {
    if (error) {
        console.log("Error in server setup");
        return;
    }
    console.log("Server listening on Port", PORT);
});