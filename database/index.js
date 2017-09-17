const mongoose = require('mongoose');
const chalk = require('chalk');
const LocationModel = require('./location');

mongoose.Promise = global.Promise;

// Connections
const developmentDb = 'mongodb://localhost/polling_locations';
let whichDb;

// If we're in development...
if (process.env.NODE_ENV === 'development') {
  // set our database to the development one
  whichDb = developmentDb;
}

// If we're in production...
if (process.env.NODE_ENV === 'production') {
  // set our database to the development one
  whichDb = process.env.MONGODB_URI;
}

// Connect to it via mongoose
mongoose.connect(whichDb);

// Get an instance of our connection to our database
const db = mongoose.connection;

// Logs that the connection has successfully been opened
db.on('error', console.error.bind(console, 'connection error:'));
// Open the connection
db.once('open', () => {
  console.log(chalk.blue(`--- Database connection successfully opened at ${whichDb} ---`));
});

exports.location = LocationModel;
