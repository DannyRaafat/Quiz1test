import Joi from "joi"

const addcompanyval = Joi.object({
    companyName: Joi.string().required(),
    description: Joi.string().required(),
    industry: Joi.string().required(),
    address: Joi.string().required(),
    numberOfEmployees: Joi.string().pattern(/^\d+-\d+$/).required(),
    companyEmail: Joi.string().required(),

})
const updatecompanyval = Joi.object({
    description: Joi.string(),
    industry: Joi.string(),
    address: Joi.string(),
    numberOfEmployees: Joi.string().pattern(/^\d+-\d+$/),
    companyEmail: Joi.string(),
    companyName: Joi.string(),
})
const getnameval = Joi.object({
    name: Joi.string().required()
})



export {
addcompanyval,
updatecompanyval,
getnameval
}