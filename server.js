'use strict'
let express = require('express');
let bodyParser = require("body-parser");

let app = express();
let router =  express.Router();
const fs = require('fs');
const sgMail = require('@sendgrid/mail');


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
router.get('/mail' , (req, res) => {
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'jjsorianoe@gmail.com',
      from: 'felicitaciones@cumpleanos.com',
      subject: 'Feliz Cumpleaños!',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<div>' +
            '<h2>Antes de que comience tu gran día ya te han enviado tu primer regalo! <a href="http://37.139.17.222/envelope"> Reclamalo ahora. </a></h2></br>' +
            '<img style="position: absolute;            top: 50%;            left: 50%;            margin-left: 150px;    margin-top: 150px;" src="https://st2.depositphotos.com/4831367/11050/v/950/depositphotos_110503134-stock-illustration-happy-birthday-flat-design-poster.jpg" width="300px"/></br>' + 
            '<h3>Te desea el equipo de felicitaciondecumpleanos S. A. y alguien mas... <h3></div>',
    };
    sgMail.send(msg);
    res.end();
})

app.use('/', router);

app.listen(9090, () => console.log('Running on port 9090'));