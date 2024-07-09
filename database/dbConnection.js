import { Console, error, log } from "console";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const dbConnection=mongoose.connect(process.env.URI).then(()=>{
    console.log(("database connected successfully"));
}).catch((err)=>{
    console.log({error: "error",Message: err.message});
})