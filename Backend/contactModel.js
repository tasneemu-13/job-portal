const {default: mongoose} = require("mongoose");
const schema = new mongoose.Schema({    
    name : String,
    email : String,
    message : String,
    subject : String
})
module.exports = mongoose.model("contact",schema) // Contact is the name of the collection in the database. It will be created automatically if it doesn't exist.