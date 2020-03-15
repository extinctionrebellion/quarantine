#!/usr/bin/env node

let axios = require('axios');
let flat = require('flat');
let csv = require('csvtojson');
let fs = require('fs');

var uniqid = function () {
  return (new Date().getTime() + Math.floor((Math.random() * 10000) + 1)).toString(16);
};

/**
 * @see https://docs.google.com/spreadsheets/d/1cCEj3O8wowwyyp2KXlTRtSxN0T2UBivDvyKRoVk9aS4/edit#gid=0
 */
axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRXhaEEh73PGXoA2VRIqhjlTK2aygeV6mf0ZbLjrBhRgLDZ1s8ZmE8rngA4Mj4XNwAKgk0BVa3gCQnq/pub?gid=0&single=true&output=csv&timestamp=' + uniqid()).then((res) => {

  csv({
    noheader: false,
    output: 'csv'
  })
    .fromString(res.data)
    .then((csvRow) => {

      let data = {
        'fr': {},
        'nl': {},
        'en': {},
      };

      for (let k in csvRow) {
        data['fr'][csvRow[k][0]] = csvRow[k][1];
        data['nl'][csvRow[k][0]] = csvRow[k][2];
        data['en'][csvRow[k][0]] = csvRow[k][3];
      }

      // unflat data
      data['fr'] = flat.unflatten(data['fr']);
      data['nl'] = flat.unflatten(data['nl']);
      data['en'] = flat.unflatten(data['en']);

      fs.writeFile('src/lang/fr-BE.js', 'export default ' + JSON.stringify(data['fr'], null, 4), () => {
      });
      fs.writeFile('src/lang/nl-BE.js', 'export default ' + JSON.stringify(data['nl'], null, 4), () => {

      });
      fs.writeFile('src/lang/en-BE.js', 'export default ' + JSON.stringify(data['en'], null, 4), () => {
      });
    });
});