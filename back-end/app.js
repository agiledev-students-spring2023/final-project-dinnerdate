require('dotenv').config();

const cors = require('cors')
const axios = require("axios");
const express = require("express") // CommonJS import style!

const jwt = require("jsonwebtoken");
// const auth = require("./auth");

// set up express
const app = express()
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

const User = require('./db');

/*************************** Routes ***************************/
// serve user data
app.get("/user/:username", async (req, res, next) => {
  const user = await User.findOne({username: req.params.username});
  res.send(JSON.stringify(user));
});

// serve restaurant data
app.get("/restaurant/:placeId", (req, res, next) => {
  const placeId = req.params.placeId;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  axios
    .get(url)
    .then(apiResponse => {
      const restaurant_data = apiResponse.data.result;
      const restaurant = {
        "name": restaurant_data['name'],
        "address": restaurant_data['formatted_address'],
        "description": restaurant_data['editorial_summary'].overview,
        "num_ratings": restaurant_data['user_ratings_total'],
        "phone_number": restaurant_data['formatted_phone_number'],
        "rating": restaurant_data['rating'],
        "url": restaurant_data['url']
      };
      res.json(restaurant);
    })
    .catch(err => next(err)) // pass any errors to express
});

// serve diner post data
app.get("/diner-post/:id", (req, res, next) => {
  const url = "https://my.api.mockaroo.com/diner_posts.json?key=85d24ca0";
  axios
    .get(url)
    .then(apiResponse => {
      console.log(JSON.stringify(apiResponse.data).replace(/["\\n]/g, ''));
      const postString = JSON.stringify(apiResponse.data).replace(/["\\n]/g, '').split(",");
      console.log(postString)
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
    .catch(err => { // if mockaroo doesn't work, serve static sample data
      console.log(err);
      res.json({
        "id": Math.random().toString(36),
        "title": "Mockaroo API rate limit reached",
        "datetime": "04/01/2023",
        "full_name": "Johnny Appleseed",
        "description": "I am lonely.",
        "rating": 1,
        "num_ratings": 2,
      });
    })
})

// serve diner request data
app.get("/diner-request/:requestId", (req, res, next) => {
  const url = "https://my.api.mockaroo.com/diner_requests.json?key=85d24ca0";
  axios
    .get(url)
    .then(apiResponse => {
      const postString = JSON.stringify(apiResponse.data).replace(/["\\n]/g, '').split(",");
      const post = {
        "id": postString[0],
        "full_name": postString[1],
        "rating": postString[2],
        "num_ratings": postString[3],
        "message": postString[4]
      };

      res.json(post);
    })
    .catch(err => { // if mockaroo doesn't work, serve static sample data
      console.log(err);
      res.json({
        "id": Math.random().toString(36),
        "full_name": "Johnny Appleseed",
        "rating": 1,
        "num_ratings": 2,
        "message": "Mockaroo API rate limit reached",
      });
    })
})
//fetch chat data [broken]
app.get("/chatdata/:chatId", (req, res, next) => {
  const url = "https://my.api.mockaroo.com/chatdata.json?key=987d00a0";
  axios
    .get(url)
    .then((apiResponse) => {
      const chatString = JSON.stringify(apiResponse.data).replace(/["\\n]/g, '').split(",");
      const chat = {
        "user": chatString[0],
        "other_user": chatString[1],
        "messages": chatString[2],
        "messages.text": chatString[3],
        "messages.message_id": chatString[4],
      };
      res.json(chat);
    })
    .catch((err) => next(err));
});

app.get("/profile", function (req, res) {
  const url = "https://my.api.mocokaroo.com/users.json?key=85d24ca0";
  axios
  .get(url)
  .then(apiResponse => {
    const userString = JSON.stringify(apiResponse.data).replace(/["\\n]/g, '').split(",");
    const user = {
      "id": userString[0],
      "email": userString[1],
      "username": userString[2],
      "password": userString[3],
      "first_name": userString[4],
      "last_name": userString[5],
      "birthdate": userString[6],
      "gender": userString[7],
      "mobile": userString[8]
    };
    console.log(user);
    res.json(user);
  })
  .catch(err => { // if mockaroo doesn't work, serve static sample data
    console.log(err);
    res.json({
      "id": Math.random().toString(36),
      "email": "appleseedj@nyu.edu",
      "username": "mockaroo_api_limit_reached",
      "password": "verysecurepassword1234",
      "first_name": "Johnny",
      "last_name": "Appleseed",
      "birthdate": "01/01/1983",
      "gender": "male",
      "mobile": "212998222",
      "rating": 1,
      "num_ratings": 2,
    });
  })
});

// serve images from picsum
app.get("/static/", (req, res, next) => {
  const url = `https://picsum.photos/${req.query.width}/${req.query.height}`;
  res.send(`<img src=${url}>`);
})

app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, birthdate, gender } = req.body;

    // check if any fields are missing
    if (!email || !password || !passwordCheck || !firstName || !lastName ){
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    // double-check password
    if (password != passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Passwords must match " });
    }

    // check if email is used
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res
        .status(400)
        .json( { msg: "An account is already registered with this email." });
    }

    // hash passwords using bcrypt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create new user with hashed password
    const newUser = new User({
      email: email,
      password: passwordHash,
      firstName: firstName,
      lastName: lastName,
      birthdate: birthdate,
      mobile: mobile,
      createdAt: Date.now()
    });

    // save and return new user
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch(e) {
    res.status(500).json({ err: error.message });
  }
})

app.post('/login', (req, res) => {

})

app.post('/create-post', (req, res) => {
  const { title, dateTime, description } = req.body;
  console.log(title, dateTime, description);
  res.status(201).json({message: 'Post created successfully'});
  console.log('We Posting!')
});

app.post('/chat', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
})

// export the express app we created to make it available to other modules
module.exports = app