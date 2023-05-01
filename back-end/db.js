const mongoose = require("mongoose");

// set up mongoose
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`Connected to ${process.env.MONGODB_CONNECTION_STRING}`);
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date }, // temporarily not required until we figure out how to make it required
    gender: { type: String, required: true },
    createdAt: { type: Date, required: true },
    postId: { type: String },
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }] // requests made by this user
});

const postSchema = new mongoose.Schema({
    placeId: { type: String, required: true },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    datetime: { type: Date, required: true }, 
    description: { type: String, required: true },
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }] // requests made on this post
});

const requestSchema = new mongoose.Schema({
    posterId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requesterId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    status: { type: String, required: true },
});

const chatSchema = new mongoose.Schema(
    {
        chatName: { type: String, trim: true, required: true },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    },
    {
        timestamps: true,
    }
);

const messageSchema = mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String, trim: true },
        chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
const Request = mongoose.model("Request", requestSchema);
const Message = mongoose.model("Message", messageSchema);
const Chat = mongoose.model("Chat", chatSchema);

  
// Exporting our model objects
module.exports = {
    Message,
    Chat,
    User,
    Post,
    Request
};
