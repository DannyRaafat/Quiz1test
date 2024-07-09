import Joi from "joi"

const signupval = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    username: Joi.string().min(2).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{5,30}$/).required(),
    recoveryemail: Joi.string().email().required(),
    DOB: Joi.date().required().iso(),
    mobileNumber: Joi.string().pattern(/^01[0125][0-9]{8}$/).required(),
    role: Joi.string().valid('User', 'Company_HR').required(),
})
const signinval = Joi.object({
    email: Joi.string().email(),
    mobileNumber: Joi.string().pattern(/^01[0125][0-9]{8}$/),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{5,30}$/).required(),
}).xor('email', 'mobileNumber').with('email', 'password').with('mobileNumber', 'password');
 
const emailval = Joi.object({
    email: Joi.string().email().required()

})
const updateval=Joi.object({
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20),
    username: Joi.string().min(2).max(20),
    email: Joi.string().email(),
    mobileNumber: Joi.string().pattern(/^01[0125][0-9]{8}$/),
    recoveryemail: Joi.string().email(),
    DOB: Joi.date().iso(),
})
const passsval=Joi.object({
    Old_password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{5,30}$/).required(),
    New_password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{5,30}$/).required(),
})
const idval = Joi.object({
    id: Joi.string().hex().length(24).required()
}).unknown(true);
const tokenval = Joi.object({
    token: Joi.string().required(),
}).unknown(true);
const resetpasswordval = Joi.object({
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{5,30}$/).required(),
    confirm_password:Joi.valid(Joi.ref('password')).required(),
    token: Joi.string().required(),
})
export {
    signupval,
    signinval,
    updateval,
    tokenval,
    emailval,
    idval   ,
    passsval,
    resetpasswordval
}