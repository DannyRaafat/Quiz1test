import { compareSync } from "bcrypt"
import { User } from "../../database/models/user.model.js";
import { errorhandle } from "../utils/errorhandle.js";

export const verifydata=async(req,res,next)=>{
    if(req.body.email){
    var user= await User.findOne({email:req.body.email})
    }
    else{
    var user= await User.findOne({mobileNumber:req.body.mobileNumber})
    }
    if(!user){
        next(new errorhandle("Password or Email or number incorrect",401))
    }
    else if(compareSync(req.body.password,user.password)){
        req.user=user;
        user.status="online"
        await user.save();
        next();
    }
    else{
        next(new errorhandle("Password or Email or number incorrect",401))
    }
}

 