const csv = require('csvtojson');

const jsonArray = [];

function csvToJson(csvPath, headers) {
  return new Promise((resolve, reject) => {
    csv({
      headers,
      noheader: false,
    })
      .fromFile(csvPath)
      .on('json', (jsonObj) => {
        jsonArray.push(jsonObj);
      })
      .on('done', (error) => {
        if (error) reject(error);

        resolve(jsonArray);
      });
  });
}

module.exports = csvToJson;
