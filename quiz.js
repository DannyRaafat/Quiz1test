process.on(`uncaughtException`, () => {
    console.log(`erorr in code`)
})

import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { errorhandle } from './src/utils/errorhandle.js'
import { globalerror } from './src/middleware/globalerror.js'
import UserRouter from './src/modules/User/user.routes.js'
import CompanyRouter from './src/modules/Company/Company.routes.js'
import JobsRouter from './src/modules/Jobs/Jobs.routes.js'
import { upload } from './src/middleware/multer.js'
import { Application } from './database/models/Application.model.js'


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