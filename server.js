'use strict';

const express = require('express');
const { PORT } = require('./config.js');

const app = express();

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}...`);
});
