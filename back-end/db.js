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
});

const postSchema = new mongoose.Schema({
    location: { type: String, required: true },
    title: { type: String, required: true },
    // createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
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

const Message = mongoose.model("message", messageSchema);
const Chat = mongoose.model("chat", chatSchema);
const User = mongoose.model("user", userSchema);
const Post = mongoose.model("post", postSchema);

// Exporting our model objects
module.exports = {
    Chat,
    User,
    Post,
};
