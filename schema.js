'use strict';

const fetch = require('node-fetch');
const util = require('util');

// since GoodReads API returns xml, we need to parse it with xml2js
// xml2js's parseString uses callback instead of a promise; so we use util to promisify it
const parseXML = util.promisify(require('xml2js').parseString);

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const { GOODREADS_API_KEY } = require('./config.js');

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: '...',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: xml => xml.title[0]
    },
    isbn: {
      type: GraphQLString,
      resolve: xml => xml.isbn[0]
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      // in this resolve function, the xml is being passed in by the parseXML promise below
      // punch in the url in fetch to see what the actual xml response looks like
      // then follow the structure to get to what you want, in this case 'name' for this particular field
      resolve: xml => xml.GoodreadsResponse.author[0].name[0]
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: xml => xml.GoodreadsResponse.author[0].books[0].book
    }
  })
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => fetch(`https://www.goodreads.com/author/show.xml?id=${args.id}&key=${GOODREADS_API_KEY}`)
          // normally when dealing with json, use res.json()
          // .then(res => res.json())
          // but this is xml so we have to convert it, see above
          .then(res => res.text())
          .then(parseXML)
      }
    })
  })
});
