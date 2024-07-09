export const globalerror=(err, req, res, next) => {
    console.log({ error:"error",Message: err.message });
    res.status(err.statuscode).json({ error:"error",Message: err.message })
}