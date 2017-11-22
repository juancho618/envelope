'use strict'
let express = require('express');
let bodyParser = require("body-parser");

let app = express();
let router =  express.Router();
const fs = require('fs');


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//views folder
app.set('views', __dirname + '/views/');

//static elements folder
app.use('/static', express.static(__dirname + '/static/'));

//angular material
app.use('/angular-material', express.static(__dirname + '/node_modules/angular-material/'));
app.use('/scripts',  express.static(__dirname + '/node_modules/'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing       application/x-www-form-urlencoded


router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
  });

router.get('/envelope', (req, res) => {
    res.render('envelope');
});
router.post('/envelope', (req, res) => {
    const data = req.body.data;
    
    
    fs.appendFile('./data.txt', JSON.stringify(data), (err) => {  
        if (err) throw err;
        console.log('File updated!');
    });
    res.end();
});
router.get('/cake', (req, res) => {
    res.render('cake');
});

app.use('/', router);

app.listen(9090, () => console.log('Running on port 9090'));