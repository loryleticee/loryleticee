const http = require('http');
const url = require('url');
const path = require('path')
var fs = require("fs");
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 4000;

var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/api/cv', function (req, res, next) {
  let datas = fs.readdirSync(__dirname+"/src/assets/img/cv");
  let files = []
  for (var file of datas) {
    let name = file.split('.');
    if(name[1] === 'pdf')
      files.push([name[0], name[0]])
  }
  res.setHeader('Content-disposition', 'attachment; filename=CV-lory-leticee.pdf');
  res.setHeader('Content-type', 'application/pdf');
  res.download(path.join(__dirname, "/src/assets/img/cv/CV-lory-leticee.pdf"));
})

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
