var resultEnv = require('dotenv').config()

const http = require('http');
const url = require('url');
const path = require('path')
var fs = require("fs");
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
//var nodemailer = require('nodemailer');
const { exec } = require("child_process");
const { JsxEmit } = require('typescript');
const readline = require('readline');

const hostname = process.env.HOSTNAME;

var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

//GET CURICULUM VITAE
app.get('/', function (req, res, next) {
  let datas = fs.readdirSync(__dirname + process.env.DIR_CV);
  let files = []
  for (var file of datas) {
    let name = file.split('.');
    if (name[1] === 'pdf')
      files.push([name[0], name[0]])
  }

  const filePath = process.env.PATH_CV;

  fs.readFile(__dirname + filePath, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
})

var LineReader = require('node-line-reader').LineReader;
const TXT_FILE_KENO = process.env.TEXT_FILE

var dateObj = new Date()
var month = String(dateObj.getUTCMonth() + 1); //months from 1-12
var day = String(dateObj.getUTCDate() );//+ 1
var year = String(dateObj.getUTCFullYear());

app.get('/keno', (req, res, next) => {
  var ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

  console.warn(ip, 'access API at ' + day + '/' + month + '/' + year)

  if (!process.env.IP_ALLOWED.includes(ip)) { // exit if it's a particular ip
    console.warn(ip, 'is an unknow IP which try to access API at ' + day + '/' + month + '/' + year)
    res.status(404).json('I dont have that')
  }

  var fileStatName = (day.length < 2 ? '0' + day : day) + '-' + (month.length < 2 ? '0' + month : month) + '-' + year + ".txt"
  //let PATH = path.join(__dirname, "../fdj/gain/logkeno/stats-" +fileStatName )
console.log('TEST :', '../../../../'+process.env.PATH_STAT_KENO + fileStatName)
  let PATH = path.join( process.env.PATH_STAT_KENO + fileStatName)

  //Test si le fichier eciste si oui renvole strinf 'ok' dans la console(stdout)
  exec("test -f " + PATH + " && echo ok", (stdout, stderr) => {
    if (!stdout) {
      exec(process.env.PATH_SCRIPT_KENO)
    }
  })

  var lines = [];
  var reader_ = new LineReader(PATH);

  for (let index = 0; index < 285; index++) {
    reader_.nextLine((err, line) => {
      if (line) {
        var splited = line.split(',')
        var arrayed;
        lines.push(splited)
        arrayed = JSON.stringify(lines).replace(']', '],').replace(',,', ',')
        fs.writeFileSync(TXT_FILE_KENO, arrayed, (err) => {
          if (err) res.json(err + 'an erro while write text for number grid');
          else { console.log(ip + ' write text file') }
        })
      } else {
        var data = fs.readFileSync(TXT_FILE_KENO)
        console.log(ip + ' Get text file')
        res.send(JSON.parse(data));
      }
    })
  }
})

//[LOTO 3 INPUT]

app.post('/loto', (req, res, next) => {
  req.on('data', function (chunk) {
    var result = JSON.parse(chunk);
    if (result == undefined) res.send("an error occured when request send", 500)

    var num1 = encodeURIComponent(result.num1.toLowerCase())
    var num2 = encodeURIComponent(result.num2.toUpperCase())
    var num3 = encodeURIComponent(result.num3.toLowerCase())

    var ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    console.warn(ip, 'access API [LOTO] at ' + day + '/' + month + '/' + year)

    if (!process.env.IP_ALLOWED.includes(ip)) { // exit if it's a particular ip
      console.warn(ip, 'is an unknow IP which try to access API at ' + day + '/' + month + '/' + year)
      res.status(404).json('I dont have that')
    }

    let day = (day.length < 2 ? '0' + day : day)
    let month = (month.length < 2 ? '0' + month : month)
    var fileStatName = day + '-' + month + '-' + year + '-' + ip.replace('.', '') + ".txt"

    let PATH = path.join(__dirname, process.env.PATH_STAT_LOTO_3 + fileStatName)

    //Test si le fichier eciste si oui renvole strinf 'ok' dans la console(stdout)
    exec("test -f " + PATH + " && echo ok", (stdout, stderr) => {
      if (!stdout) {
        exec(process.env.PATH_SCRIPT_LOTO_3 + ' ' +num1+ ' ' +num2+ ' '+num3+'"')
      }
    })

    var data = fs.readFileSync(process.env.PATH_STAT_LOTO_3 + fileStatName)
    console.log(ip + ' Get text file')
    res.send(JSON.parse(data));
  })
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

app.listen(process.env.PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${process.env.PORT}/`);
});
