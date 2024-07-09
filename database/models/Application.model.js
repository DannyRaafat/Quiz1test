import cloudinary from "../../src/middleware/cloudianry.js";
import { ObjectId } from "bson";
import mongoose, { Schema, model } from "mongoose";
import { type } from "os";

const schema = new Schema({
    jobId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    userTechSkills: [{ type: String, required: true }],
    userSoftSkills: [{ type: String, required: true }],
    userResume: { type: String, required: true },
}, {
    versionKey: false
});

schema.pre("save", function (next) {

    cloudinary.v2.uploader.upload(this.userResume, { resource_type: "auto" }, (err, result) => {
        if (err) {
            next(err);
        } else {
            this.userResume = result.secure_url;
            next();
        }
    });

});

export const Application = model("Application", schema)
