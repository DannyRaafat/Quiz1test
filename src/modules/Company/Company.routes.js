import { Router } from "express";
import { validate, validatehead } from "../../middleware/validate.js";
import { verifytoken } from "../../middleware/verifytoken.js";
import { idval, tokenval } from "../User/user.validation.js";
import * as all from "./Company.controller.js"
import { addcompanyval, getnameval, updatecompanyval } from "./Company.validation.js";


const CompanyRouter=Router()

// POST /addcompany route for adding a new company
CompanyRouter.post("/addcompany",validate(addcompanyval),validatehead(tokenval),verifytoken,all.addcompany)

// PUT /updatecompany/:id route for updating a company
CompanyRouter.put("/updatecompany",validatehead(tokenval),validate(updatecompanyval),verifytoken,all.updatecompany)

// DELETE /deletecompany/:id route for deleting a company
CompanyRouter.delete("/deletecompany",validatehead(tokenval),verifytoken,all.deletecompany)

// GET /companydata/:id route for getting a company's data using id
CompanyRouter.get("/companydata/:id",validatehead(tokenval),validate(idval),verifytoken,all.getcompanydata)

// GET /companyname/:name route for getting a company's data using name
CompanyRouter.get("/companyname/:name",validatehead(tokenval),validate(getnameval),verifytoken,all.getcompanyname)

// GET /jobapplication/:id route for getting a specific job applications
CompanyRouter.get("/jobapplication/:id",validatehead(tokenval),validate(idval),verifytoken,all.getapplications)



export default CompanyRouter