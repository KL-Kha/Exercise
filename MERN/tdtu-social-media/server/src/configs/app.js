const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const compression = require('compression'); // Compress return data to optimize performance
const session = require('express-session');
const express = require('express');
const helmet = require('helmet'); // Setting HTTP headers appropriately to hide valnuarable information
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Export a function that take app param to config
module.exports = (app) => {
    app.use(morgan('dev'));
    app.use(compression());
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '..', '..', 'public')));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(
        session({
            name: 'Secure Session Name',
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                secure: true,
                httpOnly: true,
                domain: 'example.com',
                path: 'foo/bar',
                maxAge: 3600 * 24,
            },
        }),
    );

    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
            standardHeaders: true,
            legacyHeaders: false,
        }),
    );
};
