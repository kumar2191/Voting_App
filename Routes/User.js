import express from 'express';
import User from '../Controller/User.js'
import auth from '../Auth/auth.js'
import ApplicationForm from '../Controller/AplicationForm.js'
const router=express.Router()


router.post('/User/Register',User.UserRegister)
router.post('/User/Login',User.UserLogin)
router.get('/User/Profile',auth,User.profileView)
router.post('/User/ProfileUpate',auth,User.Update)

router.get('/User/GetAll',User.getAll)
router.post('/User/ChangePassword',auth,User.ChangePassword)

router.post('/User/ApplicationForm/Register',[auth],ApplicationForm.ApplicationRegister)



export default router;