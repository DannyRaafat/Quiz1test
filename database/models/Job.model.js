import { ObjectId } from "bson";
import mongoose, { Schema, model } from "mongoose";
import { type } from "os";

const schema = new Schema({
    jobTitle :{ type: String, required: true},
    jobLocation :{type: String,enum:["remotely","onsite","hybrid"],required:true},
    workingTime :{type: String,enum:["full-time","part-time"],required:true},
    seniorityLevel :{type: String,enum:["Junior","Mid-Level","Senior","Team-Lead","CTO"],required:true},
    jobDescription :{type:String,required:true},
    technicalSkills :[{ type: String, required: true }],
    softSkills  :[{ type: String, required: true}],
    addedBy :{ type: mongoose.Types.ObjectId,ref:'User',required:true},
    CompanyId:{type: mongoose.Types.ObjectId,ref:'Company',required:true}
},{
    versionKey:false
})
export const Job =model("Job",schema)