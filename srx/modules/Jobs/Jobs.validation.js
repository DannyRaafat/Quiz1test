import Joi from "joi"

const addjobval = Joi.object({
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid').required(),
    workingTime: Joi.string().valid('part-time', 'full-time').required(),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
    jobDescription: Joi.string().required(),
    technicalSkills: Joi.array().items(Joi.string()).required(),
    softSkills: Joi.array().items(Joi.string()).required(),
})
const updatejobval = Joi.object({
    jobTitle: Joi.string(),
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: Joi.string().valid('part-time', 'full-time'),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription: Joi.string(),
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
    id: Joi.string().hex().length(24).required()
})
const nameval=Joi.object({
    name: Joi.string().required()
})

const filterval=Joi.object({
    workingTime: Joi.string().valid('part-time', 'full-time'),
    jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid'),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobTitle: Joi.string(),
    technicalSkills: Joi.string(),
})
const applyval = Joi.object({
    userTechSkills: Joi.array().items(Joi.string()).required(),
    userSoftSkills: Joi.array().items(Joi.string()).required(),
    id: Joi.string().hex().length(24).required()
})
export{
    addjobval,
    updatejobval,
    filterval,
    nameval,
    applyval
}
