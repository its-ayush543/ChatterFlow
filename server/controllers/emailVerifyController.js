const{User} = require("../models/userModel");
const {Token} = require("../models/tokenModel");


const verifyEmail = async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).send({
                message:"User not found"
            })
        }
        if(user.verified){
            return res.status(400).send({
                message:"User already verified"
            })
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if(!token){
            return res.status(400).send({
                message:"Invalid Link"
            });
        }
        if(token.expiresAt < Date.now()){
            user,verificationLinkSent = false;
            await user.save();
            return res.status(400).send({
                message:"Verification link expired"
            })
        }
        user.verified = true;
        await user.save();
        res.status(200).send({
            message:"Email verified successfully"
        })

    }catch(error){
        console.error("Error verifying email:", error);
        res.status(500).send({
            message:"Internal Server Error"
        });
        
    }
};

module.exports = verifyEmail;