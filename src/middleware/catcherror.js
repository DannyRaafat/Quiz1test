export function catcherror(msg) {
    return (req, res, next) => {
        msg(req, res, next).catch(err => {
            next(err);
        })
    }
}