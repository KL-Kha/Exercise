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

app.get('/image/gallery', (req, res) => {
    const result = handlers.api.showImageGallery();
    result.then((response) =>{
        let html_result = '';

        if ( response[0].length < 3 || response[0].length % 3 == 0){
            for ( let i = 0; i < response[0].length / 3 ; i++ ){
                html_result += '<div class="row">';

                for ( let i = 0 ; i < response[0].length ; i++){
                    html_result += `<div class="col-md-4 mb-5">
                    <div class="card">
                      <div class="card-body">
                        <img src="/upload/img/${response[0][i]}" class="img-fluid img-thumbnail"/>
                      </div>
              
                      <div class="card-footer">
                          <h5 class="text-success">Notes</h5>
                          <p>${response[1][i]}</p>
                      </div>
                    </div>
                  </div>`
                }
                html_result += '</div>';
            };
        } else {
            for ( let i = 0; i < Math.floor(response[0].length / 3) ; i++ ){
                html_result += '<div class="row">';

                for ( let i = 0 ; i < response[0].length ; i++){
                    html_result += `<div class="col-md-4 mb-5">
                    <div class="card">
                      <div class="card-body">
                        <img src="/upload/img/${response[0][i]}" class="img-fluid img-thumbnail"/>
                      </div>
              
                      <div class="card-footer">
                          <h5 class="text-success">Notes</h5>
                          <p>${response[1][i]}</p>
                      </div>
                    </div>
                  </div>`
                }
                html_result += '</div>';
            };
        }

        res.render('image-gallery', {content: html_result});
    });
})

app.post('/api/upload/images', (req, res) => {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files)=>{
        if (err) return handlers.api.uploadedImagesError(req, res, err.message)
        handlers.api.uploadedImages(req, res, fields, files)
    });
})

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