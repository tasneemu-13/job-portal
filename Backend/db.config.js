const mongoose = require("mongoose");
exports.ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");

    }catch(error){
        console.error("Error connecting to MongoDB:", error.message);
        mongoose.disconnect();
        process.exit(1);
    }
}