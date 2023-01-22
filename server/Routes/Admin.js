import express from 'express';
import Admin from '../Controller/Admin.js'
import ApplicationForm from '../Controller/AplicationForm.js'

const router=express.Router()


router.post('/admin/Register',Admin.AdminRegister)
router.post('/admin/Login',Admin.AdminLogin)

router.get('/admin/filter',ApplicationForm.Filter)


export default router;