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
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date }, // temporarily not required until we figure out how to make it required
    gender: { type: String, required: true },
    createdAt: { type: Date, required: true },
});
      
module.exports = mongoose.model('User', userSchema);