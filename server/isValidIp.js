"use strict";

require('dotenv').config()
var fs = require("fs");

const isValidIp = (req, DATE) => {
  let IP = ip(req);
  console.warn(IP, 'access API at ' + DATE().DAY + '/' + DATE().MONTH + '/' + DATE().YEAR);

  return !process.env.IP_ALLOWED.includes(IP) ?  false : true;
}

const ip = (req) => {
  return req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}

module.exports = {
  IsValidIp:isValidIp,
  Ip:ip
}
