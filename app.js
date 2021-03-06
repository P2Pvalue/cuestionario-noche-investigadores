var email = require('./email.js');
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
        composeAndSendEmail(jsonData);
        res.end();
      }

    });
  } else {
    res.end();
  }
});

server.listen(3000);

// create reusable transporter object using SMTP transport
//
// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: email.credentials
});

var composeAndSendEmail = function(json) {
  var text = "";
  var notKnownCategories = [];
  var jsonQuestions = {};
  fs.readFile(__dirname + '/client/app/questions/questions.' + json.lang + '.json', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      text += "Enhorabuena, ¡los bienes comunes producidos colaborativamente ya forman parte de tu vida!\n\n";
      text += "Las comunidades del procomún ya forman parte de tu vida,  al menos en los siguientes aspectos:\n\n";
      text += "  ";
      jsonQuestions = JSON.parse(data.toString());
      var categories = {};
      for (var i = 0, len = jsonQuestions.length; i<len; i++){
        var key = jsonQuestions[i].id;
        categories[key] = jsonQuestions[i];
        var categoryName = categories[key].text;
        if (json.hasOwnProperty(key)){
          text += categoryName;
          if (i === len-1){
            text+= ".";
          }
          else{
            text+=", ";
            }
        } else {
          notKnownCategories.push(categories[key]);
        }
      }
      text += "\n\n";
      text += "Ahora puedes...\n\n";
      text += "... descubrir nuevas comunidades:\n\n";
      for (var i = 0, lengthI = notKnownCategories.length; i<lengthI; i++){
        var category = notKnownCategories[i];
        text += "  * " + category.text + ": ";
        for (var j = 0, lengthJ = category.questions.length; j<lengthJ; j++){
          for (var k = 0, lengthK = category.questions[j].examples.length;
               k < lengthK; k ++){
            text += category.questions[j].examples[k].link + ", ";
          }
        }
        text +="\n";
      }
      text += "  * En el directorio del proyecto P2Pvalue hemos recopilado cientos de comunidades de producción colaborativa de bienes comunes. Puedes acceder a él en: http://directory.p2pvalue.eu/.\n";
      text += "\n... atreverte a involucrarte más en las comunidades que ya conoces. ¡Seguro que puedes aprender cosas nuevas!\n\n";
      for (var key in json){
        if (categories.hasOwnProperty(key)){
          for (var i = 0, len = categories[key].questions.length; i< len; i++){
            var que = categories[key].questions[i].id;
            if (json[key].hasOwnProperty(que)){
              for (var j = 0, lenJ = categories[key].questions[i].examples.length; j< lenJ; j++){
                console.log("\nj " + j);
                var ex = categories[key].questions[i].examples[j].id;
                if (json[key][que].hasOwnProperty(ex)){
                  text +=  "  * " + categories[key].questions[i].examples[j].name + ": "+ categories[key].questions[i].examples[j].link + ",\n";
                }
              }
            }
          }
        }
      }
      console.log(text);
      text += "\n\nGracias por participar en el evento \"Crea, Colabora, Modifica, Comparte\" de la Noche de los Investigadores en Madrid.\nEsperamos que hayas disfrutado del evento, descubierto cosas interesantes y despertado tu curiosidad por algunas comunidades.\n\n";
      text += "Puedes encontrar más información del proyecto y del grupo de investigación en: http://p2pvalue.eu y http://grasia.fdi.ucm.es/\n";
      text += "\n";
      text += "Un saludo y hasta pronto";

      sendEmail(json.email,text);
    }
  });  
};

var sendEmail = function(address, body) {
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'UCM P2Pvalue <p2pvalue@ucm.es>', // sender address
    to: address, // list of receivers
    subject: 'Cuestionario Noche de los Investigadores', // Subject line
    text: body
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

