import mongoose from "mongoose";


const config=async()=>{
   try {
    mongoose.set('strictQuery', true);
    await  mongoose.connect('mongodb://localhost:27017/VotingApp')
    console.log("DBconected");
   
    
   } catch (error) {
    console.log("error",error);
   }
}

export default config;
