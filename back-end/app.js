// import and instantiate express

const cors = require('cors')
const axios = require("axios");
const express = require("express") // CommonJS import style!

const app = express() // instantiate an Express object

app.use(cors());
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

// serve user data
app.get("/user/:id", (req, res, next) => {
  const url = "https://my.api.mockaroo.com/users.json?key=85d24ca0";
  axios
  .get(url)
  .then(apiResponse => {
    const userString = JSON.stringify(apiResponse.data).split(",");
    const user = {
      "id": userString[0],
      "name": userString[1],
      "address": userString[2],
      "rating": userString[3],
      "description": userString[4]
    };

    res.json(restaurant);
  })
  .catch(err => next(err)) // pass any errors to express
})

// serve restaurant data
app.get("/restaurant/:id", (req, res, next) => {
  const url = "https://my.api.mockaroo.com/restaurants.json?key=85d24ca0";
  axios
    .get(url)
    .then(apiResponse => {
      const restaurantString = JSON.stringify(apiResponse.data).split(",");
      const restaurant = {
        "id": restaurantString[0],
        "name": restaurantString[1],
        "address": restaurantString[2],
        "rating": restaurantString[3],
        "description": restaurantString[4]
      };

      res.json(restaurant);
    })
    .catch(err => next(err)) // pass any errors to express
})

// serve diner post data
app.get("/diner-post/:id", (req, res, next) => {
  const url = "https://my.api.mockaroo.com/diner_posts.json?key=85d24ca0";
  axios
    .get(url)
    .then(apiResponse => {
      const postString = JSON.stringify(apiResponse.data).split(",");
      const post = {
        "id": postString[0],
        "title": postString[1],
        "datetime": postString[2],
        "full_name": postString[3],
        "description": postString[4],
        "rating": postString[5],
        "num_ratings": postString[6]
      };

      res.json(post);
    })
    .catch(err => next(err)) // pass any errors to express
})

// serve images from picsum
// route: localhost:3000/static?width=200&height=300
app.get("/static/", (req, res, next) => {
  const url = `https://picsum.photos/${req.query.width}/${req.query.height}`;
  res.send(`<img src=${url}>`);
})

// serve chat data
app.get("/chat/:id", (req, res, next) => {
  const url = "https://api.mockaroo.com/api/901ad060?count=1000&key=987d00a0";
  axios
    .get(url)
    .then(apiResponse => {
      const chatString = JSON.stringify(apiResponse.data).split(",");
      const chat = {
        "user": chatString[0],
        "other_user": chatString[1],
        "messages": chatString[2],
        "messages.text": chatString[3],
        "messages.message_id": chatString[4],
        "rating": chatString[5],
        "num_ratings": chatString[6]
      };

      res.json(chat);
    })
    .catch(err => next(err)) // pass any errors to express
})

// export the express app we created to make it available to other modules
module.exports = app

