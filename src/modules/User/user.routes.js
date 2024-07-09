import { Router } from "express";
import * as all from "./user.controller.js";
import { checkemail } from "../../middleware/checkemail.js";
import { validate, validatehead } from "../../middleware/validate.js";
import {    emailval, idval, passsval, resetpasswordval, signinval, signupval, tokenval, updateval } from "./user.validation.js";
import { checknumber } from "../../middleware/checkphone.js";
import { verifydata } from "../../middleware/verifydata.js";
import { verifytoken, verifytokenpass } from "../../middleware/verifytoken.js";

const UserRouter=Router()
// User Router for Signup
UserRouter.post('/signup',validate(signupval),checkemail,checknumber,all.signup)

// User Router for Signin
UserRouter.post('/signin',validate(signinval),verifydata,all.signin)

// User Router for Updating User Details
UserRouter.put('/update',validatehead(tokenval),validate(updateval),checkemail,checknumber,verifytoken,all.updateuser)

// User Router for Deleting User
UserRouter.delete('/delete',validatehead(tokenval),verifytoken,all.deleteuser)

// User Router for Getting User Details
UserRouter.get('/getuser',validatehead(tokenval),verifytoken,all.getuser)

// User Router for Getting Specific User Details
UserRouter.get('/getspecificuser/:id',validate(idval),validatehead(tokenval),verifytoken,all.getspecificuser)

// User Router for Updating Password
UserRouter.put('/updatepassword',validate(passsval),validatehead(tokenval),verifytoken,all.updatepassword)

// User Router for Forgetting Password
UserRouter.get('/forgetpassword',validate(emailval),all.forgetpassword)

// User Router for Resetting Password
UserRouter.put('/resetpassword/:token',validate(resetpasswordval),verifytokenpass,all.resetpassword)

// User Router for Getting Users Using This Recovery Email
UserRouter.get('/email/:email',validate(emailval),validatehead(tokenval),verifytoken,all.getrecoveryemail)
export default UserRouter