const mongoose =  require("mongoose");

const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database connected Successfully");
    }catch(error){
        console.log("Database connection failed");
        console.log(error.message);

        process.exit(1);
    }
}

module.exports = connectDB;