"use strict";

const date = () => {
  const dateObj = new Date()
  var montRaw = String(dateObj.getUTCMonth() + 1);
  const MONTH = (montRaw.length < 2 ? '0' + montRaw : montRaw)
  var dayRaw = String(dateObj.getUTCDate());//+ 1
  const DAY = (dayRaw.length < 2 ? '0' + dayRaw : dayRaw)
  const YEAR = String(dateObj.getUTCFullYear());
  
  return  { 'DAY': DAY, 'MONTH': MONTH, 'YEAR': YEAR }
}
module.exports = {
  DATE: date
}
