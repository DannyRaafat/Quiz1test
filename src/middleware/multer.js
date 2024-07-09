import{v4 as uuidv4} from 'uuid'
import multer from 'multer'
import { errorhandle } from '../utils/errorhandle.js'



const storage=multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4()+"-"+file.originalname)

        }
        
    })
    function fileFilter(req,file,cb){
        if(file.mimetype.startsWith("application/pdf")){
            cb(null,true)
        }
        else{
            cb(new errorhandle("file not supported",400),false)
        }
    }
export const upload =multer({storage,fileFilter})

