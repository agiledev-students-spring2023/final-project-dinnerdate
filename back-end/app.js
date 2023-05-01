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

const { User, Post, Request } = require('./db');

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

// retrieve single chat info from id
app.get("/api/chat/:id", (req, res) => {
  // console.log(req.params.id);
  const singleChat = chats.find(c => c._id === req.params.id);
  res.send(singleChat);
});

// serve logged-in user data
app.get("/user/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
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
  axios.get(url)
    .then(response => {
      const restaurantData = response.data.result;
      // return null if placeId is not a food establishment
      const restaurantTypes = ['bakery', 'cafe', 'bar', 'restaurant'];
      if(!restaurantData.types.some(type => restaurantTypes.includes(type))) return res.json(); 
      const restaurant = {
        "name": restaurantData['name'],
        "address": restaurantData['formatted_address'] || restaurantData[vicinity],
        "description": restaurantData['editorial_summary']?.overview,
        "hours": restaurantData['current_opening_hours'],
        "price_level": restaurantData['price_level'],
        "num_ratings": restaurantData['user_ratings_total'],
        "phone_number": restaurantData['formatted_phone_number'] || restaurantData['international_phone_number'],
        "rating": restaurantData['rating'],
        "url": restaurantData['url']
      };
      res.json(restaurant);
    })
    .catch(err => next(err)) // pass any errors to express
});

// serve post data for restaurant
app.get("/restaurant/:placeId/posts", async (req, res, next) => {
  const posts = await Post.find({ placeId: req.params.placeId}).populate('author');
  res.json(posts);
});

// serve diner post data
app.get("/diner-post/:id", async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  res.json(post);
})

// serve diner request data
app.get("/diner-requests/:postId", async (req, res, next) => {
  const requests = await Request.find({ postId: req.params.postId});
  res.json(requests);
  console.log(requests);
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

app.post('/create-post', async (req, res) => {
  const newPost = new Post(req.body);
  const savedPost = await newPost.save();
  console.log(`Registered new post: ${savedPost}`);

  const userId = req.body.author
  const db = require('mongodb')
  const ObjectId = db.ObjectId; 
  const id = new ObjectId(userId);
  
  // const user = await User.findOne({ "_id" : id});

  try{
    User.updateOne(
      { _id: id },
      { $set: { postId: newPost._id } }
    )
    .then((result) => {
      // Check the result of the update operation
      console.log(result);
    
      // Query for the updated user object
      return User.findOne({ _id: id });
    })
    .then((user) => {
      // Log the updated user object
      console.log(user);
    })
    .catch((error) => {
      // Handle any errors that may occur during the update or query operations
      console.error(error);
    });
  }catch (e){
    console.log(e)
  }
  

  res.json();
});

app.post('/create-request', async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    const savedRequest = await newRequest.save();
    console.log(`Registered new request: ${savedRequest}`);

    // creates requests array for requester if it does not exist
    await User.updateOne({ _id: req.body.requesterId, requests: {$exists: false}}, {$set: {requests: []} });
    // add request to requests array
    await User.updateOne({ _id: req.body.requesterId}, { $push: { requests: savedRequest } });
    // do the same for the post
    await Post.updateOne({ _id: req.body.postId, requests: {$exists: false}}, {$set: {requests: []} });
    await Post.updateOne({ _id: req.body.postId}, { $push: { requests: savedRequest } });

    res.json(`Successfully registered new request`);
  } catch (error) { res.status(500).json({ err: error.message }) }
})

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

app.post('/edit-profile', async (req, res) => {
  try {
    const { firstName, lastName, email} = req.body;
    console.log(req.body)

    const db = require('mongodb')
    const ObjectId = db.ObjectId; 
    const id = new ObjectId(req.body.userId);
    const user = await User.findOne({"_id": id});

    try{
      User.updateOne(
        { _id: id },
        { $set: { 
          firstName: ((firstName != "") ? firstName : user.firstName),
          lastName: ((lastName != "") ? lastName : user.lastName),
          email: ((email != "") ? email : user.email)
        } }
      )
      .then((result) => {
        // Check the result of the update operation
        console.log(result);
      
        // Query for the updated user object
        return User.findOne({ _id: id });
      })
      .then((user) => {
        // Log the updated user object
        console.log(user);
      })
      .catch((error) => {
        // Handle any errors that may occur during the update or query operations
        console.error(error);
      });
    }catch (e){
      console.log(e)
    }

  } catch(e) { res.status(500).json({ err: e.message }); }
})

app.post('/delete-post', async (req, res) => {
  try {
    await User.updateOne({ _id: req.body.user}, { $set: { postId: '' } });

    await Post.deleteOne({ _id: req.body.postId});

    // delete from each user requests
    // aggregate and unwind but idk exact query yet 

    await Request.deleteMany({ postId: req.body.postId});

    res.json(`Successfully deleted post`);
  } catch (error) { res.status(500).json({ err: error.message }) }
})

app.post('/decline', async (req, res) => {
  try {
    await Request.updateOne({ _id: req.body._id}, { $set: { status: 'declined' } });

    await Post.updateOne({ _id: req.body.postId}, { $pull: { requests: req.body._id } });
    await Request.deleteOne({ _id: req.body._id});

    //delete from other places

    res.json(`Successfully declined request`);
  } catch (error) { res.status(500).json({ err: error.message }) }
})

app.post('/accept', async (req, res) => {
  try {
    await Request.updateOne({ _id: req.body._id}, { $set: { status: 'accepted' } });

    //delete from other places

    res.json(`Successfully accepted request`);
  } catch (error) { res.status(500).json({ err: error.message }) }
})

// export the express app we created to make it available to other modules
module.exports = app