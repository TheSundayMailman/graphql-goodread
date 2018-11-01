'use strict';

require('dotenv').config();

const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

const { PORT } = require('./config.js');
const schema = require('./schema.js');

// setup endpoint to use GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}...`);
});
