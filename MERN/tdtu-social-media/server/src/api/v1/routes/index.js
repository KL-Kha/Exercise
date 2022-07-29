const userRoute = require('./user.route.js');

function routes(app) {
    app.use('/api/v1/', userRoute);
}

module.exports = routes;
