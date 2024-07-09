import Joi from "joi";
import { User } from "../../../database/models/user.model.js";
import { compareSync, hashSync } from "bcrypt";
import { catcherror } from "../../middleware/catcherror.js";
import { errorhandle } from "../../utils/errorhandle.js";
import jwt from "jsonwebtoken";
import { Verify_email } from "../../emails/emails.js";
import { Job } from "../../../database/models/Job.model.js";
import { Company } from "../../../database/models/Company.model.js";
import { Application } from "../../../database/models/Application.model.js";


const signup = catcherror(async (req, res) => {
    req.body.password = hashSync(req.body.password, 8);
    req.body.username = req.body.firstName + " " + req.body.lastName;
    const user = await User.create(req.body)
    res.status(202).json({ message: "Signed Up Successfully", username: user.username, email: user.email, username: user.username });
})
const signin = catcherror(async (req, res, next) => {
    jwt.sign({ userId: req.user._id, role: req.user.role }, "process.env.Token_PASS", (err, token) => {
        if (err) {
            next(new errorhandle(err, 404))
        }
        res.json({ message: "success", token })
    })
})
const updateuser = catcherror(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true });

    if (req.body.firstName) {
        user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
        user.lastName = req.body.lastName;
    }
    user.username = user.firstName + " " + user.lastName;
    await user.save();
    res.json({ message: "success" })

})

const deleteuser = catcherror(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.user.userId);
    if (user) {
        const Company1 = await Company.find({ companyHR: user._id });
        Company1.forEach(async (company) => {
            await Company.findByIdAndDelete(company._id);
        });
        const jobs = await Job.find({ addedBy: user._id });
        const jobIds = jobs.map(job => job._id);
        await Job.deleteMany({ _id: { $in: jobIds } });
        await Application.deleteMany({ jobId: { $in: jobIds } });
        res.json({ message: "success" })
    }
    else {
        next(new errorhandle("Not Found", 404))
    }


})

const getuser = catcherror(async (req, res, next) => {
    const user = await User.findById(req.user.userId);

    delete user._doc.password;

    res.json({ message: "success", user })

})

const getspecificuser = catcherror(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new errorhandle("No User Found", 404));
    }
    delete user._doc.firstName;
    delete user._doc.lastName;
    delete user._doc.email;
    delete user._doc.recoveryemail;
    delete user._doc.mobileNumber;
    delete user._doc.password;
    res.json({ message: "success", user })
})

const updatepassword = catcherror(async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    if (compareSync(req.body.Old_password, user.password)) {
        user.password = hashSync(req.body.New_password, 8);
        await user.save();
        res.status(202).json({ message: "Password Changed Successfully" })
    }
    else {
        next(new errorhandle("Password Incorrect", 404));
    }
})
const forgetpassword = catcherror(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        next(new errorhandle("Email Not Found", 404));
    }
    else {
        jwt.sign({ userId: user._id }, "process.env.Token_PASS_FORGET", (err, token) => {
            if (err) {
                next(new errorhandle(err, 404))
            }
            Verify_email(user.email, "http://localhost:3000/user/resetpassword/" + token)
            res.json({ message: "Check Your Email" })
        })
    }
})

const getrecoveryemail = catcherror(async (req, res, next) => {
    const user = await User.find({ recoveryemail: req.params.email });
    if (user.length == 0) {
        next(new errorhandle("Email Not Used", 404));
    }
    else {
        res.json({ message: "success", users: user.map(user => ({ _id: user._id, username: user.username, mobileNumber: user.mobileNumber })) })
    }
})

const resetpassword = catcherror(async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    user.password = hashSync(req.body.password, 8);
    await user.save();
    res.status(202).json({ message: "Password Changed Successfully" })
})

export {
    signup,
    signin,
    updateuser,
    deleteuser,
    getuser,
    getspecificuser,
    updatepassword,
    forgetpassword,
    resetpassword,
    getrecoveryemail
}