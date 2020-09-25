var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer)

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'code4share' });
});

router.get('/about', async(req, res) => {
    res.render('about', { title: 'code4share' })
})

router.route('/contact')
    .get((req, res, next) => {
        res.render('contact', { title: 'contact' })
    })
    .post((req, res, next) => {
        req.checkBody('name', 'Invalid name').notEmpty();
        req.checkBody('email', 'Invalid email').isEmail();
        req.checkBody('message', 'Empty message').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            res.render('contact', {
                title: 'code4share',
                name: req.body.name,
                email: req.body.email,
                message: req.body.message,
                errorMessages: errors
            });

        } else {
            var mailOptions = {
                from: 'Code4share <no-reply@code4share.com>',
                to: 'em9cli9m@gmail.com',
                subject: 'you got a new message for visitor 🤛 🤜',
                text: req.body.message
            }

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
                res.render('thank', { title: 'code4share' })
            });
        }
    })

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login your account' });
})


router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register a new account' });
})



module.exports = router;