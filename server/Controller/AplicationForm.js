import {validateApplicationForm,ApplicationForm} from '../Schema/ApplicationForm.js'


const ApplicationRegister=async(req,res)=>{
    try {
        const email = req.user.email
        const {error}=validateApplicationForm(req.body)
    if(error) return res.status(400).send(error.details[0].message);
 
    const exUser=await ApplicationForm.findOne({email: email})
    if(exUser){
        res.send("You Are already Applied this Form")
    }
    else{
        let user=new ApplicationForm({
            name:req.body.name,
            email:req.user.email,
            Post: req.body.Post,
            DOB: req.body.DOB,
            PhoneNumber: req.body.PhoneNumber, 
            Batch: req.body.Batch,
            Department: req.body.Department,
            Description: req.body.Description
        })
        const result=await user.save()
        res.send(result)
    }
   } catch (error) {
    res.status(400).send(error.message)
   }
}


const Filter = async(req, res) => {
    try {
        const Query = req.body
        console.log(Query);
     const Data = await ApplicationForm.find(Query)
       res.status(200).send(Data)
   }
   catch (error) {    
           res.status(400).send("Data not found")
   }
}


export default {
    ApplicationRegister,
    Filter
}