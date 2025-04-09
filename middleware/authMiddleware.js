import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config({path:'../models/.env'});


const authMiddleware = (req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer ", ""); // Remove Bearer prefix
   
    

    if(!token) return res.status(401).json({message:'Aceess Denied'});


    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
        req.user = decoded;
        console.log(req.user.id);
        
        next();
    } catch (error) {
        res.status(400).json({message:'Invalid token' })
        
    }
};
export default authMiddleware;