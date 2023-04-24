require('dotenv').config();
const bcrypt = require("bcryptjs")
const cors = require('cors')
const axios = require("axios");
const express = require("express") // CommonJS import style!
const jwt = require("jsonwebtoken");
const chats = require("./data/data")
// const auth = require("./auth");

// set up express
const app = express()
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

const { User, Post } = require('./db');


/*************************** Middleware ***************************/
function verifyToken(req, res, next) {
  const token = req.headers['authorization'].replace(/^Bearer\s+/, "");;
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.userId = decoded.id;
  } catch (e) {
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  }
  next();
}

/*************************** Routes ***************************/
// check if api is running
app.get("/", (req, res) => {
  res.send("API is Running");
});

// serve sample chat data
app.get("/api/chat", (req, res) => {
  res.send(chats);
});

// serve logged-in user data
app.get("/api/user", verifyToken, async (req, res, next) => {
  const userId = req.userId; // the logged-in users id, defined by verifyToken
  const user = await User.findOne({ _id:  userId});
  if(!user) return res.status(400).json({ message: "User could not be found! "});
  res.json(user);
});

// modify logged-in user data
app.patch("/api/user", verifyToken, async (req, res, next) => {
  const userId = req.userId; // the logged-in users id, defined by verifyToken
  const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
  if(!user) return res.status(400).json({ message: "User could not be found! "});
  res.json(user);
});

// serve restaurant data
app.get("/restaurant/:placeId", (req, res, next) => {
  const placeId = req.params.placeId;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  console.log(url);
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
      const postString = JSON.stringify(apiResponse.data).replace(/["\\n]/g, '').split(",");
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

//fetch chat data 
app.get("/chatdata/:chatId", (req, res, next) => {
  const url = "https://my.api.mockaroo.com/chatdata.json?key=987d00a0";
  axios
    .get(url)
    .then((apiResponse) => {
      const chatData = apiResponse.data.find(chat => chat.chat_id === req.params.chatId);
      if (!chatData) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      const chat = {
        user: chatData.user,
        other_user: chatData.other_user,
        messages: chatData.messages.map(message => ({
          text: message.text,
          message_id: message.message_id
        }))
      };
      res.json(chat);
    })
    .catch((err) => next(err));
});


app.get("/profile", function (req, res) {
  const url = "https://my.api.mockaroo.com/users.json?key=85d24ca0";
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

// validate email and mobile fields
function validateProfile(req, res, next) {
  const { email, mobile } = req.body;

  // check if email is valid
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // check if mobile is valid
  if (!/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ error: "Invalid mobile number" });
  }

  // if all validation passes, move to the next middleware function
  next();
}

app.post("/profile", validateProfile, async (req, res) => {
  // Get data from request body
  const { id, email, username, password, first_name, last_name, birthdate, gender, mobile } = req.body;

  // Save user data to database
  const user = new User({
    firstName: first_name,
    lastName: last_name,
    email: email,
    password: password,
    birthdate: birthdate,
    gender: gender,
    createdAt: new Date()
  });

  try {
    await user.save();
    console.log("User saved to database:", user);
    res.json({ success: true });
  } catch (err) {
    console.error("Error saving user to database:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// serve images from picsum
app.get("/static/", (req, res, next) => {
  const url = `https://picsum.photos/${req.query.width}/${req.query.height}`;
  res.send(`<img src=${url}>`);
})

app.post('/create-post/:placeId', async(req, res) => {
  try {
    const { title, date, description } = req.body;

    const placeId = req.params.placeId;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    console.log(url);

    axios
    .get(url)
    .then(async apiResponse => {
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
  
      const newPost = new Post({
        location: restaurant['address'],
        title: title,
        createdBy: "USER",
        date: date,
        description: description
      });
  
      // save and log new post
      const savedPost = await newPost.save();
      console.log(`Added new post: ${savedPost}`)
  
      // create and return json web token
      const token = jwt.sign({ id: newPost._id }, process.env.JWT_SECRET);
      res.json({
        token,
        post: {
          id: newPost._id,
          title: newPost.title,
          date: newPost.date,
          description: newPost.description,
        }
      });
    })

    

  } catch(e) { res.status(500).json({ err: e.message }); console.log(e.message) }
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

app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, birthday, gender, password, passwordCheck } = req.body;
    
    // check if email is used
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) return res.status(400).json( { message: "An account is already registered with this email." });
    // double-check password
    if (password != passwordCheck) return res.status(400).json({ message: "Passwords must match" });

    // hash passwords using bcrypt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create user using hashed password
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHash,
      birthdate: birthday,
      gender: gender,
      createdAt: new Date(Date.now()).toLocaleDateString()
    });

    // save and log new user
    const savedUser = await newUser.save();
    console.log(`Registered new user: ${savedUser}`)

    // create and return json web token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      }
    });

  } catch(e) { res.status(500).json({ err: e.message }); }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // find email in database
    const user = await User.findOne({ email: email });
    if(!user) return res.status(400).json({ message: "No account with this email has been registered. "});
    
    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password is incorrect." });

    // create json web token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    });
  }
  catch (error) { res.status(500).json({ err: error.message }); }
})


// export the express app we created to make it available to other modules
module.exports = app