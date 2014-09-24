var http = require('http');
var nodemailer = require('nodemailer');

var server = http.createServer(function(req, res) {
  if (req.method == "POST") {
    var jsonString = '';
    var jsonData;

    req.on('data', function(data) {
      jsonString += data;
    });

    req.on('end', function() {
      var jsonData = JSON.parse(jsonString);

      //sendMail(jsonData.email, emailBody(jsonData));
    });
  }

  res.end();
});

server.listen(3000);

// create reusable transporter object using SMTP transport
//
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'gmail.user@gmail.com',
    pass: 'userpass'
  }
});

var sendEmail = function(address, data) {
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'UCM P2Pvalue <p2pvalue@ucm.es>', // sender address
    to: address, // list of receivers
    subject: 'Cuestionario Noche de los Investigadores', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }else{
      console.log('Message sent: ' + info.response);
    }
  });
};