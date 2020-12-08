"use strict";

var resultEnv = require('dotenv').config()

//const http = require('http');
//const url = require('url');
const path = require('path')
const { exec } = require("child_process");
const hostname = process.env.HOSTNAME;
const TXT_FILE_KENO = process.env.TXT_FILE_KENO

//var nodemailer = require('nodemailer');
var fs = require("fs");
var cors = require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//APP INIT 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//READER
var LineReader = require('node-line-reader').LineReader;

//MODULES
const {PushCv} = require('./pushCv');
const {IsValidIp, Ip} = require('./isValidIp');
const {Python} = require('./python.js');
const {DATE} = require('./date.js');

//GET CURICULUM VITAE
app.get('/', function (req, res, next) {
  const pathFile = PushCv();
  if (!pathFile) {res.end('No file found');}
  fs.readFile(__dirname + pathFile, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
})

app.get('/keno', (req, res, next) => {
  let fileStatName = `${DATE().DAY}-${DATE().MONTH}-${DATE().YEAR}.txt`;
  let PATH = process.env.PRE_PATH_PROD + process.env.PATH_STAT_KENO_PROD + fileStatName;
  
  if (!IsValidIp(req, DATE)) {
    console.warn(`[UNKNOW IP]`);
    res.status(404).json('I d\'ont have that');
  }

  !Python(PATH) ? console.warn(`[UNKNOW IP]`) : console.log(`[OK PYTHON]`);
 
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
        console.log(`\x1b[5;10;42m ${Ip(req)} Get [KENO] File\x1b[0m`)
        res.send(JSON.parse(data));
      }
    })
  }
})

//[LOTO 3 INPUT]

app.post('/loto', (req, res, next) => {
  req.on('data', function (chunk) {
    let result = JSON.parse(chunk);
    if (result == undefined) res.send("an error occured when request send", 500)

    let ip = Ip(req);
    var ipFormat = ip.replace(/(\.)/g, '');
    var fileStatName = ipFormat + ".txt"

    let num1 = encodeURIComponent(result.num1.toLowerCase())
    let num2 = encodeURIComponent(result.num2.toUpperCase())
    let num3 = encodeURIComponent(result.num3.toLowerCase())
    let num4 = encodeURIComponent(result.num4.toLowerCase())
    let num5 = encodeURIComponent(result.num5.toUpperCase())

    let numberAskedNums = 3
    //IF MORE THAN DRAÏ ARGS
    new Array(num4, num5).map((el) => { el !== '' ? numberAskedNums += 1 : null })

    const ENV = [{}, {}, {},
    { 'stat': process.env.PATH_STAT_LOTO_3_PROD, 'script': process.env.PATH_SCRIPT_LOTO_3_PROD, 'suffix': process.env.SUFFIX_PATH_SCRIPT_LOTO_3_PROD },
    { 'stat': process.env.PATH_STAT_LOTO_4_PROD, 'script': process.env.PATH_SCRIPT_LOTO_4_PROD, 'suffix': process.env.SUFFIX_PATH_SCRIPT_LOTO_4_PROD },
    { 'stat': process.env.PATH_STAT_LOTO_5_PROD, 'script': process.env.PATH_SCRIPT_LOTO_5_PROD, 'suffix': process.env.SUFFIX_PATH_SCRIPT_LOTO_5_PROD }
    ]

    let PATH = path.join(__dirname, ENV[numberAskedNums].stat + fileStatName)
    
    console.warn(`[LOTO] ${ip} at ${DATE().DAY}/${DATE().MONTH}/${DATE().YEAR}`)

    if (!IsValidIp(req, DATE)) {
      console.warn(`[UNKNOW IP]`);
      res.status(404).json('I d\'ont have that');
    }
    
    exec(ENV[numberAskedNums].script + ' ' + num1 + ' ' + num2 + ' ' + num3 + ' ' + num4 + ' ' + num5 + ' ' + ip + ENV[numberAskedNums].suffix)

    setTimeout(() => {
      var data = fs.readFileSync(PATH);
      console.log(`${ip} Get [LOTO] File ${data.length} octets`);

      res.send(data);
    }, 2000)
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
