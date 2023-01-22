import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import DB from './Config/DB.js'
import dotenv from 'dotenv'
import Admin from './Routes/Admin.js'
import User from './Routes/User.js'
import { logger} from './middleware/logger.js'
const app = express();

dotenv.config()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

DB()


app.use('/api',Admin)
app.use('/api', User)

const port=process.env.PORT || 7000
app.listen(process.env.PORT || 5000,() =>{
    logger.log('info',`server is running in port ${port}`);
})