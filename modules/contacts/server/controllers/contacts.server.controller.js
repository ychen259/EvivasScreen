'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Contact = mongoose.model('Contact'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  config = require(path.resolve('./config/config')),
  nodemailer = require('nodemailer'),
  _ = require('lodash');


exports.sendEmail = function(req, res) {
  var email = req.body.email;
  var name = req.body.name;
  var phone = req.body.phone;
  var detail = req.body.detail;
console.log("start to send email");
  var smtpTransport = nodemailer.createTransport(config.mailer.options);

  var email_context = "<p> Dear Nova Screen Team, </p>" +
                      "<br />" +
                      "<p>" + detail + "</p>" +
                      "<br />" + 
                      "<p> Sincerely, </p>" +
                      "<p>" + name + "</p>" + 
                      "<br />" + 
                      "<p> My Contact Info: </p>" +                      
                      "<p>Phone number: " + phone + "</p>" +
                      "<p>Email : " + email + "</p>";


  var mailOptions = {
    from: config.mailer.from,
    to: config.mailer.to,
    subject: "Request from Aztec Hotel Home Page",
    html: email_context
  }
console.log("try to send email");
  smtpTransport.sendMail(mailOptions, function (err) {
        if (!err) {
          res.send({message: 'An email has been sent to the provided email with further instructions.'});
        } else {
          res.status(400).send({ message: 'Failure sending email'});
          console.log("err: " + err);
        }
  });

};
