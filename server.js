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
const TXT_FILE_KENO = process.env.TXT_FILE_KENO

const dateObj = new Date()
var montRaw = String(dateObj.getUTCMonth() + 1);
const MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw)
var dayRaw = String(dateObj.getUTCDate());//+ 1
const DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw)
const YEAR = String(dateObj.getUTCFullYear());

app.get('/keno', (req, res, next) => {
  let ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

  console.warn(ip, 'access API at ' + DAY + '/' + MONTH + '/' + YEAR)

  if (!process.env.IP_ALLOWED.includes(ip)) { // exit if it's a particular ip
    console.warn(ip, 'is an unknow IP which try to access API at ' + DAY + '/' + MONTH + '/' + YEAR)
    res.status(404).json('I dont have that')
  }

  let fileStatName = DAY + '-' + MONTH + '-' + YEAR + ".txt"
  let PATH = process.env.PRE_PATH_PROD + process.env.PATH_STAT_KENO_PROD + fileStatName

  //Test si le fichier eciste si oui renvole strinf 'ok' dans la console(stdout)
  exec("test -f " + PATH + " && echo ok", (stdout, stderr) => {
    if (!stdout) {
      exec(process.env.PATH_SCRIPT_KENO_PROD)
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
        console.log(ip + ' Get text [KENO] file')
        res.send(JSON.parse(data));
      }
    })
  }
})

//[LOTO 3 INPUT]

app.post('/loto', (req, res, next) => {
  req.on('data', function (chunk) {
    var result = JSON.parse(chunk);
    var ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    var ipFormat = ip.replace(/(\.)/g, '')

    if (result == undefined) res.send("an error occured when request send", 500)

    var num1 = encodeURIComponent(result.num1.toLowerCase())
    var num2 = encodeURIComponent(result.num2.toUpperCase())
    var num3 = encodeURIComponent(result.num3.toLowerCase())

    console.warn(ip, 'access API [LOTO] at ' + DAY + '/' + MONTH + '/' + YEAR)

    if (!process.env.IP_ALLOWED.includes(ip)) { // exit if it's a particular ip
      console.warn(ip, 'is an unknow IP which try to access API at ' + DAY + '/' + MONTH + '/' + YEAR)
      res.status(404).json('I dont have that')
    }

    var fileStatName = DAY + '-' + MONTH + '-' + YEAR + '-' + ipFormat + ".txt"
    let PATH = path.join(__dirname, process.env.PATH_STAT_LOTO_3_PROD + fileStatName)
   
    console.warn('LOTO SCRIPT RUNNING...')
    console.log('TEST :', process.env.PATH_SCRIPT_LOTO_3_PROD + ' ' + num1 + ' ' + num2 + ' ' + num3 + ' ' + ip)
    exec(process.env.PATH_SCRIPT_LOTO_3_PROD + ' ' + num1 + ' ' + num2 + ' ' + num3 + ' ' + ip+'"')//+"process.env.SUFFIX_PATH_SCRIPT_LOTO_3_PROD)
    
    setTimeout(()=>{
      var data = fs.readFileSync(process.env.PATH_STAT_LOTO_3_PROD + fileStatName)
      console.log(ip + ' Get text [LOTO] file ' + data.length + 'octets')
  
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
