import { validatehead, validate, validatequery, validate1 } from "../../middleware/validate.js";
import { idval, tokenval } from "../User/user.validation.js";
import * as all from "./Jobs.controller.js"
import { Router } from "express";
import { addjobval, applyval, filterval, nameval, updatejobval } from "./Jobs.validation.js";
import { verifytoken } from "../../middleware/verifytoken.js";
import { upload } from "../../middleware/multer.js";


const JobsRouter=Router()


// POST /addjob route for adding a new job
JobsRouter.post("/addjob",validatehead(tokenval),validate(addjobval),verifytoken,all.addjob)

// PUT /updatejob/:id route for updating a job
JobsRouter.put("/updatejob/:id",validatehead(tokenval),validate(updatejobval),verifytoken,all.updatejob)

// DELETE /deletejob/:id route for deleting a job
JobsRouter.delete("/deletejob/:id",validatehead(tokenval),validate(idval),verifytoken,all.deletejob)

// GET /getalljobs route for getting all jobs
JobsRouter.get("/getalljobs",validatehead(tokenval),verifytoken,all.getalljobs)

// GET /getcompanyjob/:name route for getting all jobs for a company
JobsRouter.get("/getcompanyjob/:name",validatehead(tokenval),validate(nameval),verifytoken,all.getalljobforcompany)

// GET /getjobfilter/ route for getting jobs filtered by various fields
JobsRouter.get("/getjobfilter/",validatehead(tokenval),validatequery(filterval),verifytoken,all.getjobfilter)

// POST /applytojob/:id route for applying to a job
JobsRouter.post("/applytojob/:id",validatehead(tokenval),verifytoken,upload.single('userResume'),validate(applyval),all.applytojob)

// GET /excelsheet route for generating an excel sheet containing all job applications for a company
JobsRouter.get("/excelsheet",validatehead(tokenval),verifytoken,all.excelsheet)


export default JobsRouter;