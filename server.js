'use strict'
let express = require('express');

let app = express();
let router =  express.Router();


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//views folder
app.set('views', __dirname + '/views/');

//static elements folder
app.use('/static', express.static(__dirname + '/static/'));

//angular material
app.use('/angular-material', express.static(__dirname + '/node_modules/angular-material/'));
app.use('/scripts',  express.static(__dirname + '/node_modules/'));


router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
  });

router.get('/envelope', (req, res) => {
    res.render('envelope');
});
router.get('/cake', (req, res) => {
    res.render('cake');
});

app.use('/', router);

app.listen(9090, () => console.log('Running on port 9090'));