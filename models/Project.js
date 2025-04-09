import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
          name:{
            type:String,
            required:true,
            trim:true,
          },
          description:{
            type:String,
            
            trim:true,
          },
          members:{
            type:[String], 
            default:true,
          },
          collaborators:{
            type:[String],
            default:true,
          },
         
          createdAt:{
            type: Date,
            default:Date.now,
          }
});

  const Project = mongoose.model('Project' , projectSchema);
  export default Project;