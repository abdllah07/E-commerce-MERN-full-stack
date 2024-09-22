const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


// register 

const registerUser = async(req, res) => {
    const { userName, email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email})
        if(checkUser) return res.json({success: false, message: "User Already exists with the same email "})
        const hashPassword = await bcrypt.hash(password , 12)
        const newUser = new User({
            userName,
            email,
            password : hashPassword
        })

        await newUser.save();
        res.status(200).json({ success : true , message: "User registered successfully" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false ,message: "some error records " });
        
    }
}



// login 
const loginUser = async(req , res) => {
    const {  email, password } = req.body;


    try {

        const checkUser = await User.findOne({ email})
        if(!checkUser) return res.json({success: false, message: "User not found please register first  "});


        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);

        if(!checkPasswordMatch) return res.json({success: false, message: "Incorrect password or email Please try again"});

        const token = jwt.sign({
            id : checkUser._id , role : checkUser.role , email : checkUser.email
        } , 'CLIENT_SECRET_KEY', {expiresIn : '60min'});

        res.cookie('token' , token , {httpOnly : true , secure : false}).json({
            success : true,
            message: "User logged in successfully",
            user : {
                email : checkUser.email,
                role : checkUser.role,
                id: checkUser._id
            }
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false ,message: "some error records " });
        
    }
}



module.exports = {registerUser , loginUser}