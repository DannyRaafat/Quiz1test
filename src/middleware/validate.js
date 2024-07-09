import { errorhandle } from "../utils/errorhandle.js"
export const validate = (check) => {
    return (req, res, next) => {
        let { error } = check.validate({ ...req.body, ...req.params, ...req.query }, { abortEarly: false })
        if (!error) {
            next()
        } else {
            const errMsgs = error.details.map(err => err.message);
            next(new errorhandle(errMsgs, 401))
        }
    }
}
export const validate1 = (check) => {
    return (req, res, next) => {
        let { error } = check.validate(req.body , { abortEarly: false })
        if (!error) {
            next()
        } else {
            const errMsgs = error.details.map(err => err.message);
            next(new errorhandle(errMsgs, 401))
        }
    }
}
export const validatehead = (check) => {
    return (req, res, next) => {
        let { error } = check.validate({ ...req.headers ,...req.params}, { abortEarly: false })
        if (!error) {
            next()
        } else {
            const errMsgs = error.details.map(err => err.message);
            next(new errorhandle(errMsgs, 401))
        }
    }
}

export const validatequery = (check) => {
    return (req, res, next) => {
        let { error } = check.validate({ ...req.query }, { abortEarly: false })
        if (!error) {
            next()
        } else {
            const errMsgs = error.details.map(err => err.message);
            next(new errorhandle(errMsgs, 401))
        }
    }
}