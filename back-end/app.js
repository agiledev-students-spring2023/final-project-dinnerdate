// import and instantiate express
require('dotenv').config();

const cors = require('cors')
const axios = require("axios");
const express = require("express") // CommonJS import style!

const app = express() // instantiate an Express object

app.use(cors());
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// server responds to POST requests made by create-post
app.post('/create-post', (req, res) => {
  const { title, dateTime, description } = req.body;
  console.log(title, dateTime, description);
  res.status(201).json({message: 'Post created successfully'});
  console.log('We Posting!')
});

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
app.get("/restaurant/:placeId", (req, res, next) => {
  const placeId = req.params.placeId;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  axios
    .get(url)
    .then(apiResponse => {
      const restaurant_data = apiResponse.data.result;
      console.log(apiResponse.data)
      const restaurant = {
        "name": restaurant_data['name'],
        "address": restaurant_data['formatted_address'],
        "description": restaurant_data['editorial_summary'].overview,
        "num_ratings": restaurant_data['user_ratings_total'],
        "phone_number": restaurant_data['formatted_phone_number'],
        "rating": restaurant_data['rating'],
        
        "url": restaurant_data['url']
      }
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

// serve diner request data
app.get("/diner-request/requestId", (req, res, next) => {
  const url = "https://my.api.mockaroo.com/diner_requests.json?key=85d24ca0";
  axios
    .get(url)
    .then(apiResponse => {
      const postString = JSON.stringify(apiResponse.data).split(",");
      const post = {
        "id": postString[0],
        "full_name": postString[1],
        "rating": postString[2],
        "num_ratings": postString[3],
        "message": postString[4]
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


// export the express app we created to make it available to other modules
module.exports = app