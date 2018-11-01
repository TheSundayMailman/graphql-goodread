# GraphQL Exercise

GraphQL Exercise using GoodReads API.

## How to use
* Clone this repo and run `npm install`.
* Create a `.env` file in root directory. Within it, declare a `GOODREADS_API_KEY` variable using your API key.
* Start server using `nodemon server.js`.
* In your browser, visit `localhost:8000/graphql` to start querying

Try this sample query
```
query {
  author(id: 4432) {
    name,
    books {
      title,
      isbn
    }
  }
}
```

Visit [GoodReads](https://www.goodreads.com/api) for more author IDs, explore XML response for more ways to query, or setting up your own API key.
