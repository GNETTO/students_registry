var express = require("express");
var createError = require('http-errors');

var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('../weblibrary/node_modules/morgan');
var jade = require('jade');
//var session  = require("../weblibrary/node_modules/express-session");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var async = require("async")
//var expressValidator = require('express-validator')
var errorHandler = require("errorhandler");
//var pass = require("passport");
var session = require("express-session");
//var flash = require('connect-flash');
var mongoDB = 'mongodb://127.0.0.1/presence_db';
//var dotenv  = require('dotenv')

let models = require("./models/les_models");

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('open', () => { console.log("Connected successfully to database ") });
db.on('error', (e) => { console.log(e) });

var app = express();
// process.env.NODE_ENV ="production";
process.env.NODE_ENV = "development";

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: "secret",
    save: true,
    saveUninitialized: true

}));

global.settings = {
    sheet_generation: true,
    blabla: [20, 5, 396]
};

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.locals.d = false;

    next()
})

models.setting_model.find({}, (err, settings) => {
    //console.log(settings)
    settings = settings[0]; //console.log(settings)
    global.settings = settings
})

app.use("/", require("./routes/mainpage"));
app.use("/administration", require("./routes/dashboard"));

app.get("/geoloc", (req, res) => {

    res.render('geoloc');
});

//5.3499169086982725, -4.011131684699846

/*app.use('/login', require("./routes/login"));
app.use('/success', require("./routes/success"));
app.use('/dashboard', require("./routes/dashboard"))*/

/*var nmap = require('libnmap');

nmap.discover(function (err, report) {
    if (err) throw new Error(err);

    for (var item in report) {
        console.log(JSON.stringify(report[item]));
    }
});*/

//console.log(new Date(Date.now()).toLocaleDateString("en-US"))
app.listen(3000, function () { console.log('serverx is listening to port 3000...ok') });
