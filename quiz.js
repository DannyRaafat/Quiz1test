process.on(`uncaughtException`, () => {
    console.log(`erorr in code`)
})

import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { errorhandle } from './srx/utils/errorhandle.js'
import { globalerror } from './srx/middleware/globalerror.js'
import UserRouter from './srx/modules/User/user.routes.js'
import CompanyRouter from './srx/modules/Company/Company.routes.js'
import JobsRouter from './srx/modules/Jobs/Jobs.routes.js'
 

const app = express()

app.use(express.json())
app.use('/User',UserRouter)
app.use('/company',CompanyRouter)
app.use('/job',JobsRouter)

app.use('*', (req, res, next) => {
    next(new errorhandle(`route not found ${req.originalUrl},Try Visiting https://documenter.getpostman.com/view/35029632/2sA3e1Bq8s`, 404))
})

app.use(globalerror)

process.on(`unhandledRejection`, (err) => {
    console.log(err);
})
 
app.listen(process.env.PORT, () => console.log("server is running")) 