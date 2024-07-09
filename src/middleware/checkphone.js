import { User } from "../../database/models/user.model.js";
import { Verify_email } from "../emails/emails.js";
import { errorhandle } from "../utils/errorhandle.js";
const checknumber = async (req, res, next) => {
    const user = await User.findOne({ mobileNumber : req.body.mobileNumber  });
    if (user) {
        return next(new errorhandle("mobileNumber Already Used", 401))
    }
    else {
        next();
    }
}
export {
    checknumber
}