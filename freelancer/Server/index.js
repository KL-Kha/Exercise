const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/', function(req, res, next){
    console.log(req.body);
    res.json("OKE");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, 'Not Found !'));
});

// error handler
app.use(function (err, req, res, next) {
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
