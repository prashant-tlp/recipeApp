const mongoose= require('mongoose')
const bcrypt= require('bcrypt')
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

userSchema.pre('save', async function(){
    const salt=await bcrypt.genSalt(10)
    const hashpassword= await bcrypt.hash(this.password, salt)
    this.password= hashpassword
})



const regUser=mongoose.model('users',userSchema)
module.exports=regUser