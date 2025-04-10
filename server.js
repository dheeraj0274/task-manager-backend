import express from 'express';
import mongoose from 'mongoose';
import router from './Routes/userRoute.js';
import cors from 'cors'
import dotenv from 'dotenv'

import ProjectRoutes from './Routes/ProjectRoute.js'
dotenv.config({path:"./models/.env"});

const app = express();
const Port = process.env.PORT || 5000;
app.use(express.json())
const allowedOrigins = [
    "http://localhost:5173",
    "https://task-manager-frontend-6ni7cu1zi.vercel.app",
    "https://task-manager-frontend-two-rose.vercel.app"
  ];

app.use(cors({
    origin: function (origin,callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true)
        }
        else{
            callback(new console.error('new cors not allowed')
            );
        }
        
    },
    credentials:true
}))

// Mongoose Connection
await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB Connected");
    
}).catch((err) => {
    console.log("Mongodb Connection Failed" , err);
    
     
});
 

app.get('/', (req,res)=>{
    res.send('hi')
})

app.use('/api/v1' , router);
app.use('/api/projects' ,ProjectRoutes )



app.listen(Port , ()=>{
 console.log(`Server is running on the port ${Port}`);
 
})