// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const axios = require("axios");

app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

app.get("/", (req, res) => {
    const presentation = ["a", "b"];
    const body = {
        title: "Hello!",
        layout: presentation,
        categories: ["course-notes"],
        heading: "Hello!",
        message: "Welcome to this JSON document, served up by Express",
        imagePath: "/static/images/donkey.jpg",
      }
    res.json(body);
});

// serve user data (from mockaroo)
app.get("/user/:id", (req, res, next) => {
  const url = "https://my.api.mockaroo.com/users.json?key=85d24ca0";
  serveAPIData(req, res, next, url);
})

// serve images from picsum
// route: localhost:3000/static?width=200&height=300
app.get("/static/", (req, res, next) => {
  const url = `https://picsum.photos/${req.query.width}/${req.query.height}`;
  res.send(`<img src=${url}>`);
})

// helper function to fetch and serve data from API using axios
const serveAPIData = (req, res, next, url, contentType = "json") => {
  res.set('Content-Type', contentType);
  axios
    .get(url)
    .then(apiResponse => res.send(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
}

// export the express app we created to make it available to other modules
module.exports = app

