const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const { userRoute } = require("./routes/userRoute");
const {postRoute} = require("./routes/postRoute")
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api", userRoute);
app.use("/api",postRoute)
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to data base")
    }
    catch (err) {
            console.log(err.message)
    }
}

app.listen(process.env.PORT,()=>{
    connect();
    console.log("port 8080")
})