const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userRoute = express.Router();
userRoute.post("/register", async (req, res) => {
    const { username, avatar, email, password } = req.body;
    try {
        const user = await User.userModel.findOne({ email });
        if (user) {
            res.status(400).json({ err: "User already registered" })
        }
        else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    res.status(400).json({ err: err.message })
                }
                const user = new User.userModel({
                    username,
                    avatar,
                    email,
                    password:hash
                });
                await user.save();
                res.status(200).json({ msg: "user successfully registered" })
            })
        }
    }
    catch (err) {
        res.status(400).json({ err: err.message })
    }
})
userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.userModel.findOne({ email });
        
        if (user) {
            
            bcrypt.compare(password, user.password, (err, result) => {

                if (result) {
                    
                    let token = jwt.sign({ 
                        userID: user._id
                     },
                        process.env.secretCode, { expiresIn: "3d" })
                    res.status(200).json({ msg: "Login Successfully", token })
                } else {
                    res.status(400).json({ err: "try again.... wrong credentials" })
                }
            })
        }
        else { 
            res.status(400).json({err:"Unavailable account details please sign in"})
        }
    }
    catch (err) {
        res.status(400).json({err:err.message})
    }
})

module.exports = {
    userRoute
}