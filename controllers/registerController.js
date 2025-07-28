const brcypt = require('bcrypt');
const {User, validateRegister}= require('../models/userModel');
const { Token } = require("../models/tokenModel.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");


const registerController = async(req,res) => {
    try{
        const {error} = validateRegister(req.body);
        if(error) return res.status(400).send({message: error.details[0].message});

        let user = await User.findOne({email:req.body.email});
        if(user && user.verified){
            return res.status(409).message({message: " User with given email already exists."});
        }
        if(user && user.verificationLinkSent){
            return res.status(400).sned({
                message: "Verification link already sent to this email."
            });
        }

        const salt = await brcypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await brcypt.hash(req.body.password, salt);

        user = await new User({...req.body, password: hashedPassword}).save();


        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(16).toString("hex"),
            createdAt: Date.now(),
            expiresAt: Date.now.now() + 3600000
        }).save();


        const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);

        user.verificationLinkSent = true;
        await user.save();
        res.status(201).send({
            message:`Verification link sent to ${user.email}. Please check your inbox.`,
        })
    }catch(err){
        console.error("Error in registerController:", err);
        res.status(500).send({message: "Internal Server Error"});
        
    }


};

module.exports = registerController;
