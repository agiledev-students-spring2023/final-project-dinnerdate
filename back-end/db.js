const mongoose = require("mongoose");

// set up mongoose
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
        console.log(`Connected to ${process.env.MONGODB_CONNECTION_STRING}`);
    }).catch((error) => {
        console.log('Error connecting to MongoDB', error);
    });

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    mobile: { type: String, required: true },
    birthdate: { type: Date, required: true },
    joindate: { type: Date, required: true },
});
      
module.exports = mongoose.model('User', userSchema);