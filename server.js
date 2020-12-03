require('dotenv').config()
const http = require('http');
const url = require('url');
const path = require('path')
var fs = require("fs");
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
//var nodemailer = require('nodemailer');
const { exec } = require("child_process");

const hostname = '0.0.0.0';
const port = 4000;

var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', function (req, res, next) {
  let datas = fs.readdirSync(__dirname + "/src/assets/img/cv");
  let files = []
  for (var file of datas) {
    let name = file.split('.');
    if (name[1] === 'pdf')
      files.push([name[0], name[0]])
  }

  const filePath = "/src/assets/img/cv/CV-lory-leticee.pdf";
  fs.readFile(__dirname + filePath, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
})


var LineReader = require('node-line-reader').LineReader;

app.get('/fdj', function (req, res, next) {
  exec("cd /home/ubuntu/gain && bash -l -c 'sudo python3 /home/ubuntu/gain/keno.py'")
  var dateObj = new Date();
  var month = String(dateObj.getUTCMonth() + 1); //months from 1-12
  var day = String(dateObj.getUTCDate());
  var year = String(dateObj.getUTCFullYear());

  let PATH = path.join(__dirname, "../../../../home/ubuntu/gain/logkeno/stats-" + (day.length < 2 ? '0' + day : day) + '-' + (month.length < 2 ? '0' + month : month) + '-' + year + ".txt")

  var lines = [];
  var midi = {};
  var moismidi = {};
  var soir = {};
  var moissoir = {};

  var reader = new LineReader(PATH);
  var expr = -1
  for (let index = 0; index < 285; index++) {
    reader.nextLine(function (err, line) {
      if (line) {
        lines.push(line)
      } else {

        lines.map((line) => {
          var splited = line.split(',')
          console.log('TEST :', splited.length)
          if (splited.length < 2) {
            expr += 1;
            fs.appendFile("./u.json", JSON.stringify({ line }), (err) => {
              if (err) res.json(err);
            });
          } else {
            switch (expr) {
              case (expr - 1) === 0:
                midi[`${splited[0]}`] = splited[1]
                fs.appendFile("./u.json", JSON.stringify({ midi }), (err) => {
                  if (err) res.json(err);
                });
                break;
              case (expr - 1) === 1:
                moismidi[`${splited[0]}`] = splited[1]
                fs.appendFile("./u.json", JSON.stringify({ moismidi }), (err) => {
                  if (err) res.json(err);
                });
                break;
              case (expr - 1) === 2:
                soir[`${splited[0]}`] = splited[1]
                fs.appendFile("./u.json", JSON.stringify({ soir }), (err) => {
                  if (err) res.json(err);
                });
                break;
              case (expr - 1) === 3:
                moissoir[`${splited[0]}`] = splited[1]
                fs.appendFile("./u.json", JSON.stringify({ moissoir }), (err) => {
                  if (err) res.json(err);
                });
                break;
              default:
                console.log(`Sorry, we are out of ${expr}.`);
            }
          }
        })


        setTimeout(() => {
          fs.readFile('./u.json', function (err, data) {
            res.contentType("application/json");
            res.send(data);
          });
        }, 2000)


      }
    })
  }
  ///res.sendFile(path.join(__dirname, "../../../../home/ubuntu/gain/logkeno/stats-"+(day.length < 2 ? '0'+day :day) +'-'+(month.length < 2 ? '0'+month :month)+'-'+year+".txt"))
})


// app.post('/mail', function (req, res) {
//   req.on('data', function (chunk) {
//     var result = JSON.parse(chunk);
//     if(result == undefined) res.send("an error occured when request send", 500)

//     var msg = encodeURIComponent(result.message.toLowerCase())
//     var name = encodeURIComponent(result.first.toUpperCase())
//     var email = encodeURIComponent(result.email.toLowerCase())

//     var transporter = nodemailer.createTransport({
//       service: process.env.MAIL_SERVICE,
//       auth: {
//         user: process.env.MAIL_FROM,
//         pass: process.env.MAIL_PSWD
//       }
//     });

//     var mailOptions = {
//       from: process.env.MAIL_FROM,
//       to: process.env.MAIL_TO,
//       subject: 'Mail from Portfolio',
//       text: name+' Sent you this message: '+msg+' from this email: ' + email
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//         res.send('Message has been send')
//         window.close();
//       }
//     });
//   });
// });


// app.get('/file/:template', function (req, res, next) {
//   let title = req.params.template.toLowerCase()
//   res.sendFile(path.join(__dirname, "demo/src/example/" + title +".json"))
// })

// app.get('/download/:template', function(req, res){
//   let title = req.params.template.toLowerCase()
//   res.setHeader('Content-disposition', 'attachment; filename=' + title + '.html');
//   res.setHeader('Content-type', 'text/html');
//   res.download(path.join(__dirname, "demo/src/example/html/" + title +".html"), title +".html"); 
// });

// app.post('/',function(req, res){
//   req.on('data', function (chunk) {
//       var result = JSON.parse(chunk);
//       let title = result.title.toLowerCase()
//       if(!result.html) {
//         fs.writeFile("demo/src/example/" + title + ".json", JSON.stringify(result.data), (err) => {
//           if (err) res.json(err);
//           res.end("Successfully Written to File " + title + ".json");
//         });
//       } else {
//         fs.writeFile("demo/src/example/html/" + title + ".html", JSON.stringify(result.data), (err) => {
//           if (err) res.json(err);
//           res.end("Successfully Written to File " + title + ".html");
//         });
//       }

//       return result;
//   });
// })

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
