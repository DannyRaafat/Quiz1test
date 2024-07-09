import { Schema, model } from "mongoose";

const schema = new Schema({
    firstName : { type: String, required: true },
    lastName : { type: String, required: true },
    username  : { type: String,required: true },
    email: { type: String, required: true,unique:true },
    password:{ type: String, required: true},
    recoveryemail: { type: String, required: true},
    DOB:{type:Date,required:true},
    mobileNumber:{type:Number,required:true,unique:true},
    role:{type: String,enum:["User","Company_HR"],default:"user"},
    status:{type: String,enum:["online","offline"],default:"offline"}

},{
    versionKey:false
})
export const User =model("User",schema)
