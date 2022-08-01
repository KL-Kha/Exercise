const mongoose = require('mongoose');

module.exports = function connect() {
    const MONGODB_URI = process.env.MONGODB_URI;

    const options = {
        // autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
        keepAlive: true, // For long running applications
        keepAliveInitialDelay: 300000,
    };

    mongoose
        .connect(MONGODB_URI, options)
        .then((result) => {
            // console.log('🚀 ~ file: database.config.js ~ line 7 ~ result', result);
            console.log('Mongoose connection connected');
        })
        .catch((error) => {
            console.log('🚀 ~ file: database.config.js ~ line 11 ~ error', error);
            handleDatabaseError(error);
        });

    // Error handling for established connections
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connection connected');
    });

    mongoose.connection.on('error', (error) => {
        console.error('Mongoose connection error: ' + error);
    });

    mongoose.connection.on('disconnected', () => {
        console.error('Mongoose connection disconnected');
    });
};
