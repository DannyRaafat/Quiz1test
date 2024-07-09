import { errorhandle } from "../utils/errorhandle.js"
import  jwt  from "jsonwebtoken";

export const verifytoken = (req, res, next) => {
    // Extract the token from the request headers
    let { token } = req.headers
    
    // Verify the token using the secret key
    jwt.verify(token, 'process.env.Token_PASS', (err, decoded) => {
        // If there is an error while verifying the token, send an error
        if (err) {
            next(new errorhandle("invalid token", 401))
        }
        // If the token is valid, set the decoded token data in the request object and move to the next middleware
        else {
            req.user=decoded
            next()
        }
    })
}

export const verifytokenpass = (req, res, next) => {
    // Extract the token from the request headers
    let { token } = req.params
    
    // Verify the token using the secret key
    jwt.verify(token, 'process.env.Token_PASS_FORGET', (err, decoded) => {
        // If there is an error while verifying the token, send an error
        if (err) {
     
            next(new errorhandle("invalid token", 401))
        }
        // If the token is valid, set the decoded token data in the request object and move to the next middleware
        else {
            req.user=decoded
            next()
        }
    })
}
