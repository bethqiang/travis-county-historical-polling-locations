const fs = require('fs');
const json2csv = require('json2csv');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser();

let list = [];
const fields = ['Year', 'Name', 'Address', 'Precinct', 'Mega Site', 'Early Voting', 'Election Day Voting', 'Mobile Voting'];
const pathToPdf = '';

function pdfToJson(fileInputDir, fileOutputDir) {
  return new Promise((resolve, reject) => {
    pdfParser.on('pdfParser_dataError', errData => reject(errData.parserError));
    pdfParser.on('pdfParser_dataReady', pdfData => {
      fs.writeFile(fileOutputDir, JSON.stringify(pdfData));
      resolve(true);
    });

    pdfParser.loadPDF(fileInputDir);
  });
}

function listPush(pagesText) {
  for (let idx = 0; idx <= pagesText.length - 3; idx += 3) {
    const textName = pagesText[idx].R[0].T;
    const textAddress = pagesText[idx + 1].R[0].T;
    const textPrecinct = pagesText[idx + 2].R[0].T;

    let instance = {
      Year: 2014,
      Name: textName,
      Address: textAddress.replace(/%20/g, ' ').replace(/%40/g, '@'),
      Precinct: textPrecinct.replace(/%20/g, ' '),
      'Mega Site': 'FALSE',
      'Early Voting': 'FALSE',
      'Election Day Voting': 'TRUE',
      'Mobile Voting': 'FALSE',
    };

    list.push(instance);
    // console.log(list);
  }
}

pdfToJson('../public/pdf2014.pdf', '../public/pdf2014-1.json')
  .then(response => {
    const dataPages = require(pathToPdf).formImage.Pages;

    for (let pages in dataPages) {
      listPush(dataPages[pages].Texts);
    }

    const csv = json2csv({data: list, fields: fields});

    fs.writeFile('../public/pdf2014.csv', csv, err => {
      if (err) throw err;
      console.log('file saved');
    });
  })
  .catch(err => {
    console.log(err);
  });
