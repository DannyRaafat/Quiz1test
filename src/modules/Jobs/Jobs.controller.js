import { extract } from "tar"
import { Job } from "../../../database/models/Job.model.js"
import { errorhandle } from "../../utils/errorhandle.js";
import { catcherror } from "../../middleware/catcherror.js";
import { Company } from "../../../database/models/Company.model.js";
import { Application } from "../../../database/models/Application.model.js";
import XLSX from "xlsx"

//addjob to the current user company
const addjob = catcherror(async (req, res, next) => {
    const comp = await Company.findOne({ companyHR: req.user.userId })
    if (req.user.role != "Company_HR") {
        next(new errorhandle("Not Allowed", 401))
    }
    else if (!comp) {
        next(new errorhandle("Not Found", 404))
    }
    else {
        req.body.addedBy = req.user.userId;
        req.body.CompanyId = comp._id
        const Job1 = await Job.create(req.body)
        res.status(202).json({ message: "Success", Job1 })
    }
})

//updatejob found in the current user company

const updatejob = catcherror(async (req, res, next) => {
    const job = await Job.findById(req.params.id)
    if (req.user.role != "Company_HR") {
        next(new errorhandle("Not Allowed", 401))
    }
    else if (!job) {
        next(new errorhandle("Not Found", 404))
    }
    else if (job.addedBy != req.user.userId) {
        next(new errorhandle("Not Allowed", 401))
    }
    else {
        const Job1 = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(202).json({ message: "Success", Job1 })
    }
})

//delete job found in the current user company


const deletejob = catcherror(async (req, res, next) => {
    const job = await Job.findById(req.params.id)

    if (req.user.role != "Company_HR") {
        next(new errorhandle("Not Allowed", 401))
    }
    else if (!job) {
        next(new errorhandle("Not Found", 404))
    }
    else if (job.addedBy != req.user.userId) {
        next(new errorhandle("Not Allowed", 401))
    }
    else {
        const jobs = await Job.findByIdAndDelete(req.params.id);
        await Application.deleteMany({ jobId: jobs._id });
        res.status(202).json({ message: "Success" })
    }
})

//print all jobs

const getalljobs = catcherror(async (req, res, next) => {
    const jobs = await Job.find().populate('CompanyId')
    res.json({ message: "success", jobs })
})

//print all jobs for a spcecifc company

const getalljobforcompany = catcherror(async (req, res, next) => {
    const comp = await Company.findOne({ companyName: req.params.name })
    const jobs = await Job.find({ CompanyId: comp._id })
    res.json({ message: "success", jobs })
})

//filter jobs

const getjobfilter = catcherror(async (req, res, next) => {
    const query = {}
    if (req.query.workingTime) {
        query.workingTime = {
            $in: req.query.workingTime.split(",")
        }
    }
    if (req.query.jobLocation) {
        query.jobLocation = {
            $in: req.query.jobLocation.split(",")
        }
    }
    if (req.query.seniorityLevel) {
        query.seniorityLevel = {
            $in: req.query.seniorityLevel.split(",")
        }
    }
    if (req.query.jobTitle) {
        query.jobTitle = {
            $regex: req.query.jobTitle, $options: 'i'
        }
    }
    if (req.query.technicalSkills) {
        query.technicalSkills = {
            $in: req.query.technicalSkills.split(",")
        }
    }
    const jobs = await Job.find(query)
    res.json({ message: "success", jobs })
})

//apply to a job

const applytojob = catcherror(async (req, res, next) => {
    const job = await Job.findById(req.params.id)
    if (req.user.role != "User") {
        return next(new errorhandle("Not Allowed", 401))
    }
    if (!job) {
        return next(new errorhandle("Not Found", 404))
    }
    else if (!req.file) {
        return next(new errorhandle("Send data", 404))
    }
    else {
        req.body.userResume = req.file.path
        req.body.jobId = job._id
        req.body.userId = req.user.userId
        const app= await Application.create(req.body)  
        delete app._doc._id;
        res.status(202).json({ message: "Success",app })
    }
})

//create an excel sheet of all applications for current user's company

const excelsheet = catcherror(async (req, res, next) => {
    const comp = await Company.findOne({ companyHR: req.user.userId })
    if (req.user.role != "Company_HR") {
        return next(new errorhandle("Not Allowed", 401))
    }
    else if(!comp){
        return next(new errorhandle("Not Found", 404))
    }
    const jobs = await Job.find({ CompanyId: comp._id })
    var applications = await Application.find({
        jobId: {
            $in: jobs.map(job => job._id)
        }
    }).lean()
    applications = applications.map(doc => ({
        ...doc,
        _id: doc._id.toString(),
        jobId: doc.jobId.toString(),
        userId: doc.userId.toString(),
        userTechSkills: doc.userTechSkills.join(','),
        userSoftSkills: doc.userSoftSkills.join(','),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(applications);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applications');
    const filepath = `./${comp.companyName}.xlsx`
    XLSX.writeFile(workbook, filepath);
    res.json({ message: `Excel Sheet Created` })

})
export {
    addjob,
    updatejob,
    deletejob,
    getalljobs,
    getalljobforcompany,
    getjobfilter,
    applytojob,
    excelsheet
}
