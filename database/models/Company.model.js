import { ObjectId } from "bson";
import mongoose, { Schema, model } from "mongoose";
import { type } from "os";

const schema = new Schema({
    companyName:{ type: String, required: true ,unique:true},
    description:{type:String,required:true},
    industry:{type:String,required:true},
    address:{type:String,required:true},
    numberOfEmployees:{type:String,required:true},
    companyEmail:{type:String,required:true,unique:true},
    companyHR:{ type: mongoose.Types.ObjectId,ref:'User',required:true}
},{
    versionKey:false
})
export const Company=model("Company",schema)