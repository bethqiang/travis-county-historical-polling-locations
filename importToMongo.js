const Location = require('./database/location');

const csvToJson = require('./csvToJson');

const pollingData = './public/pollingData20142016.csv';
const headers = ['year', 'name', 'address', 'neighborhood', 'neighborhoodSpanish', 'precincts', 'megaSite', 'earlyVoting', 'electionDayVoting'];

csvToJson(pollingData, headers)
  .then((jsonArray) => {
    console.log('Data imported!');
    Location.collection.insert(jsonArray);
  });

