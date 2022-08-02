require('dotenv').config();

const logEvent = require('./api/v1/utils/logEvents');
const createError = require('http-errors');
const express = require('express');

const configs = require('./configs/app');
const databaseConfig = require('./configs/database.config');
const routes = require('./api/v1/routes');

const app = express();

// Connect to database
databaseConfig();

// Apply config
configs(app);

// Setup routes
// Call function routes and pass app to it to apply routes
routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, 'Not Found !'));
});

// error handler
app.use(function (err, req, res, next) {
    logEvent({ message: err.message, requestURL: req.url, requestMethod: req.method });

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ status: err.status || 500, message: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
