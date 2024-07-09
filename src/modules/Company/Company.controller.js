
import { errorhandle } from "../../utils/errorhandle.js";
import { catcherror } from "../../middleware/catcherror.js";
import { Company } from "../../../database/models/Company.model.js";
import { Job } from "../../../database/models/Job.model.js";
import { Application } from "../../../database/models/Application.model.js";
import { User } from "../../../database/models/user.model.js";


const addcompany = catcherror(async (req, res, next) => {
    const comp = await Company.find({ companyHR: req.user.userId })
    if(comp.length>=1){
        next(new errorhandle("Not Allowed", 401))
    }
    const user = await User.findById(req.user.userId);;
    if (!user) {
        next(new errorhandle("Not Found", 404))
    }
    else if (req.user.role != "Company_HR") {
        next(new errorhandle("Not Allowed", 401))
    }
    else {
        const company = await Company.findOne({ companyName: req.body.companyName })
        const company1 = await Company.findOne({ companyEmail: req.body.companyEmail })
        if (company || company1) {
            next(new errorhandle("Company Name Used Or Email is Used", 401))
        }
        else {
            req.body.companyHR = req.user.userId
            const Company1 = await Company.create(req.body)
            res.json({ message: "success" })
        }
    }
})

const updatecompany = catcherror(async (req, res, next) => {

    if (req.user.role != "Company_HR") {
        next(new errorhandle("Not Allowed", 401))
    } else {
        const comp = await Company.findOne({ companyHR: req.user.userId })
        if (!comp) {
            return next(new errorhandle("Not Found", 404))
        }
        const company2 = await Company.findOne({ companyName: req.body.companyName })
        const company1 = await Company.findOne({ companyEmail: req.body.companyEmail })
        if (company2 || company1) {
            next(new errorhandle("Company Name Used Or Email is Used", 401))
        }
        else {
            const Company1 = await Company.findOneAndUpdate({ companyHR: req.user.userId }, req.body, { new: true })
            res.json({ message: "success" })
        }
    }
}
)

const deletecompany = catcherror(async (req, res, next) => {
    if (req.user.role != "Company_HR") {
        next(new errorhandle("Not Allowed", 401))
    }
    const comp = await Company.findOne({ companyHR: req.user.userId })

    if (!comp) {
        next(new errorhandle("Not Found", 404))
    }
    else {
        const Company1 = await Company.findOneAndDelete({ companyHR: req.user.userId })
        if (!Company1) {
            next(new errorhandle("Not Found", 404))
        }
        else {
            const jobs = await Job.find({ addedBy: Company1.companyHR });
            const jobIds = jobs.map(job => job._id);
            await Job.deleteMany({ _id: { $in: jobIds } });
            await Application.deleteMany({ jobId: { $in: jobIds } });
            res.json({ message: "success" })
        }
    }
}
)

const getcompanydata = catcherror(async (req, res, next) => {
    if (req.user.role != "Company_HR") {
        return next(new errorhandle("Not Allowed", 401))
    }
    const comp = await Company.findById(req.params.id)
    if (!comp) {
        next(new errorhandle("Not Found", 404))
    }
    else {
        const jobs = await Job.find({ addedBy: comp.companyHR });
        res.json({ message: "success", comp, jobs })
    }
}
)

const getcompanyname = catcherror(async (req, res, next) => {
    const comp = await Company.findOne({ companyName: req.params.name })
    if (!comp) {
        next(new errorhandle("Not Found", 404))
    }
    else {
        res.json({ message: "success", comp })
    }
}
)

const getapplications = catcherror(async (req, res, next) => {
    if (req.user.role != "Company_HR") {
        return next(new errorhandle("Not Allowed", 401))
    }
    const job = await Job.findById(req.params.id)
    if (!job) {
        next(new errorhandle("Not Found", 404))
    }
    else if (job.addedBy != req.user.userId) {
        next(new errorhandle("Not Allowed", 401))
    }
    else {

        const applications = await Application.find({ jobId: job._id }).populate({
            path: 'userId',
            select: 'firstName lastName username mobileNumber email -_id'
        })

        res.json({ message: "success", applications })
    }
}
)


export {
    addcompany,
    updatecompany,
    deletecompany,
    getcompanydata,
    getcompanyname,
    getapplications
}