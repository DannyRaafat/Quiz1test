import { User } from "../../database/models/user.model.js";
import { Verify_email } from "../emails/emails.js";
import { errorhandle } from "../utils/errorhandle.js";
const checkemail = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return next(new errorhandle("Email Already Used", 401))
    }
    else {
        
        next();
    }
}
export {
    checkemail
}