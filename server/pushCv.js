"use strict";

require('dotenv').config()
var fs = require("fs");

const pushCv = () => {
    const filePath = process.env.PATH_CV;
    const datas = fs.readdirSync(__dirname + process.env.DIR_CV);
    let filesFound = []

    for (var file of datas) {
      let name = file.split('.');
      name[1]  === 'pdf' ? filesFound.push([name[0], name[0]]) : null
    }

    return filesFound.length > 0 ? filePath : false 
}
module.exports = {
    PushCv:pushCv
}
