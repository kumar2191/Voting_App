import {validateUser,User} from '../Schema/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserRegister=async(req,res)=>{
    const email = req.body.email
    const {error}=validateUser(req.body)
   try {
    if(error) return res.status(400).send(error.details[0].message);
 
    const exUser=await User.findOne({email: email})
    if(exUser){
        res.send("email is already taken")
    }
    else{
        let hash =await bcrypt.hash(req.body.password,10)
       
        let user=new User({
            name:req.body.name,
            email:req.body.email,
            password: hash,
            Batch: req.body.Batch,
            Department: req.body.Department,
      
        })
        const result=await user.save()
        res.send(result)

    }
   } catch (error) {
    res.status(400).send(error.message)
   }
}

const UserLogin = async(req, res) => {
    try {
        console.log( req.body);
        let userData=await User.findOne({email: req.body.email});
        if (!userData) {
            return res.status(400).send("email not found")
        }
        let validpassword =await bcrypt.compare(req.body.password,userData.password)
       if(!validpassword) {
        return res.status(400).send("not a valid password")
       }
       const id=userData._id
       const email=userData.email
      const userToken =await jwt.sign({id:id,email},process.env.JWTKEY);

      res.header('auth',userToken).send(userToken)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const Update=async (req,res)=>{
   
    const data=req.body
    try {
        if(!req.body.RegNo && !req.body.email){
            let update=await User.findOneAndUpdate({_id:req.user.id},{$set:data},{new:true})
            if(update){
                try {
                    res.status(200).send(update)
                } catch (error) {
                    res.status(400).send(error.message)
                }
            }else{
                console.log(req.user.id);
                res.send("User not found")
            }
        }else{
            res.send("you did not edit emil (or) RegNo")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
   
    
}
const ChangePassword=async(req,res)=>{
    try {
        let hash=await bcrypt.hash(req.body.password,10);

        let update=await User.findOneAndUpdate({_id:req.user.id},{$set:{password:hash}},{new:true})
        res.status(200).send("updated Successfuly")
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const getAll = async(req, res) => {
    let result=await User.find().select('-password')
    res.send(result)
}

const profileView=async(req, res) => {
    let result=await User.findById({_id:req.user.id})
    res.status(200).send(result)
}
export default {UserRegister,UserLogin,Update,getAll,ChangePassword,profileView}