var fs = require('fs');
var http = require('http');
var nodemailer = require('nodemailer');
var db = require('monk')('localhost/diagnostico');
var questions = db.get('questions');

var server = http.createServer(function(req, res) {
  if (req.method == "POST") {
    var jsonString = '';
    var jsonData;

    req.on('data', function(data) {
      jsonString += data;
    });

    req.on('end', function() {
      var jsonData = JSON.parse(jsonString);

      if (req.url === '/results') {
        questions.insert(jsonData, function(err, doc) {
          if (err) throw err;

          res.writeHead(200, { 'Content-Type': 'application/json' });

          console.log(doc);
          res.write(JSON.stringify(doc));

          res.end();
        });
      } else {
        sendEmail(jsonData.email, emailBody(jsonData));
        res.end();
      }

    });
  } else {
    res.end();
  }
});

server.listen(3000);

var emailCredentials = function() {
  var cred = {};
  
  fs.readFile(__dirname + '/email.json', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      cred = JSON.parse(data.toString());
    }
  });

  console.log('cred' + cred);

  return cred;
};

// create reusable transporter object using SMTP transport
//
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: emailCredentials()
});

var emailBody = function(json) {
  return "data";
};

var sendEmail = function(address, body) {
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'UCM P2Pvalue <p2pvalue@ucm.es>', // sender address
    to: address, // list of receivers
    subject: 'Cuestionario Noche de los Investigadores', // Subject line
    text: body
  };

  console.log(mailOptions);
  console.log(emailCredentials());
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }else{
      console.log('Message sent: ' + info.response);
    }
  });
};

