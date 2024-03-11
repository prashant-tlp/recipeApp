const express = require("express");
const route = express.Router();
const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt')

////////////////////importing usern model/////////////
const regUser = require("../mongo/usermodel");

/////////////////////importing recipe data model//////
const regData=require('../mongo/datamodel')

///////////////////import multer middleware//////
const upload=require('../multer/multer')

/////////////////// register user ////////////
route.post("/register-user", async (req, res) => {
    const { name, email, password } = req.body;
    const register = await new regUser({ name, email, password });
    const result = await register.save();
    res.send({ message: "user registered sucessfully", userdata: result });
  
});

route.post('/user-login',async(req,res)=>{
    
    const {email,password}=req.body
    if(email && password){
        const preuser= await regUser.findOne({email})
        if(preuser){
            const matchpass= await bcrypt.compare(password, preuser.password)
            if(matchpass){
                const token= await jwt.sign({email},'secret',{expiresIn:'1h'})
                res.send({message:'login successful',result:preuser,token})
            }
            else{
                res.send({message:'credential mismatch'})
            }
        }
        else{
            res.send({message:"user not found"})
        }
    }
    else{
        res.send({message:'fill all the fields'})
    }
})

route.post('/add-recipee',upload.single('image'),async(req,res)=>{
    const {rname,email,ingredients,method,image}=req.body
    const register= await new regData({rname,email,ingredients,method,image:req.file.filename})
    const result=await register.save()
    res.send({message:'recipe added sucessfully',data:result})
})

route.get('/recipees',async(req,res)=>{
    const data= await regData.find()
    res.send({message:'data fetched successfully', result:data})
})

route.get('/detail/:id',async (req,res)=>{
    const recipee= await regData.findById({_id:req.params.id})
    res.send({message:"detailed recipee is here" ,recipee})
})

route.get('/my-recipee/:id',async(req,res)=>{

    const myrecipees= await regData.find({email:req.params.id})
    res.send({message:"fetched successfully",result:myrecipees})
})
module.exports = route;