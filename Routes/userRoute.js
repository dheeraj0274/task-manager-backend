import express from "express";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import authMiddleware from "../middleware/authMiddleware.js";
 const router = express.Router();



 router.post('/register' , async(req,res)=>{
    try {
        const {username , email , password} = req.body;

        //For existing user
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:'User already exist'})
            // create new user
        const newUser = new User({username , email , password});
        await newUser.save();

        //Generate jwt token
         const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn:'1hr'});

    
        res.status(200).json({message:'User registered successfully' , token , user:newUser});
    
    
        
    } catch (error) {
        console.log(error);
         res.status(500).json({ message: "Server error"})
        
    }
})

    router.post('/login' , async(req,res)=>{
        try {
             const {email , password} = req.body;

             const user = await User.findOne({email});
             if(!user) return res.status(400).json({message:'Invalid Credentials'});
            //  compare password for login
            if(user.password !== password) return res.status(400).json({message:'Invalid Credentials'});
             
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            res.status(200).json({
                message:'Login Successfully' , token , user
             })
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Internal Server Error'})
             
            
        }

    })
    router.get('/profile' , authMiddleware, async(req,res,next)=>{
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);
           
            
           
            
        } catch (error) {
            res.status(500).json({message:'Server Error'});
            
        }
    })
   

  
   


 

 export default router;