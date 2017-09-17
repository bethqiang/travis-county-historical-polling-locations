const express = require('express');
const resolve = require('path').resolve;
const logger = require('morgan');
const chalk = require('chalk');
const db = require('./database');

const app = express();
const Locations = db.location;

app.use(logger('dev'));

// Serve static files
app.use(express.static(resolve(__dirname, './public')));

// Routes
app.get('/api', (req, res, next) => {
  Locations.find().exec()
    .then((locations) => {
      console.log('locations', locations);
      return res.json({ success: true, locations });
    })
    .catch(next);
});

// Send index.html for anything else
app.get('/*', (req, res) => {
  res.sendFile(resolve(__dirname, '../public/index.html'));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(chalk.blue(`--- Listening on port ${port} ---`));
});

// Dev error handler
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    }).end();
  });
}

// Prod error handler - no stacktraces leaked to user
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {},
    }).end();
  });
}
