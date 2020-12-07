"use strict";

require('dotenv').config();
var fs = require("fs");
const { exec } = require("child_process");

const python = (PATH) => {
  
  //Test si le fichier eciste si oui renvole strinf 'ok' dans la console(stdout)
  let response = exec("test -f " + PATH + " && echo ok", (stdout, stderr) => {
    return !stdout ? exec(process.env.PATH_SCRIPT_KENO_LOCAL) : false;
  })
  
  return response;
}
module.exports = {
  Python: python
}
