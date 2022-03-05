const express = require('express')
const expressHandlebars = require('express-handlebars')
const multiparty = require('multiparty');
const app = express()
const port = 8080

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded())

const handlers = require('./lib/handlers');

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/api/upload/images', (req, res) => {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files)=>{
        if (err) return handlers.api.uploadedImagesError(req, res, err.message)
        handlers.api.uploadedImages(req, res, fields, files)
    });
})

// #region Code in slide
// app.get('/vacation-photo-ajax', handlers.vacationPhotoContestAjax);

// app.post('/api/vacation-photo-contest', (req, res)=>{
//     const form = new multiparty.Form();
//     form.parse(req, (err, fields, files)=>{
//         if (err) return handlers.api.vacationPhotoContestError(req, res, err.message)
//         handlers.api.vacationPhotoContest(req, res, fields, files)
//     });
// });

// app.get('/newsletter-signup', (req, res) => {
//     res.render('newsletter-signup', { csrf: 'CSRF token goes here'})
// })

// app.post('/newsletter-signup/process', (req, res) => {
//     console.log('Form (from querystring): ' + req.query.form)
//     console.log('CSRF token (from hidden form field): ' + req.body._csrf)
//     console.log('Name (from visible form field): ' + req.body.name)
//     console.log('Email (from visible form field): ' + req.body.email)

//     res.redirect(303, '/newsletter-signup/thank-you')
// })

// app.get('/newsletter-signup/thank-you', (req, res) =>
//     res.render('thankyou')
// )
// app.get('/newsletter', handlers.newsletter);

// app.post('/api/newsletter-signup', handlers.api.newsletterSignup);
 
// app.get('/vacation-photo', (req, res) => {
//     res.render('vacation-photo', { csrf: 'CSRF token goes here'});
// });

// app.post('/vacation-photo', (req, res) => {
//     const form = new multiparty.Form();
//     form.parse(req, (error, fields, files) => {
//         if (error) {
//             return res.status(500).send(error.message);
//         }

//         console.log('field data: ', fields)
//         console.log('files: ', files)
//         res.redirect(303, '/thankyou')
//     });
// });

// app.get('/register', (req, res) => {
//     res.render('register');
// })

// app.post('/register', (req, res) => {
//     console.log("Nhận Method POST");
//     res.render("thankyou");
// })

// app.get('/register2', (req, res) => {
//     res.render('register2');
// })

// app.post('/register2', (req, res) => {
//     console.log("Nhận Method POST 2");
//     res.redirect(303, 'thankyou');
// })

// app.get('/thankyou', (req, res) => {
//     res.render("thankyou");
// });
//#endregion

// custom 404 page
app.use((req, res) => {

    res.status(404)

    res.render('404')

})

// custom 500 page
app.use((err, req, res, next) => {

    console.error(err.message)

    res.status(500)

    res.render('500')

})

app.listen(port, () => console.log(

    `Express started on http://localhost:${port}; ` +

    'press Ctrl-C to terminate. '))