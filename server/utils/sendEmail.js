const nodemailer = require('nodemailer');


module.exports = async (email, subject, text) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            // secure: Boolean(process.env.SECURE),
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });

        console.log(`Email send to ${email}`);
        
    }catch(error){
        console.error( error);
        console.error(`Error sending email to ${email}:`, error.message);
        throw error;
        
    }
};