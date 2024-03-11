const express= require ('express');
const app= express()
const port=5000;

/////////////////// cors middleware//////////////
const cors=require('cors')
app.use(cors())

///////////////////body parser middleware/////////////
const bodyparser=require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

///////////////////mongodb connection file import/////////
require('./mongo/mongoconnect')

/////////////////admin router///////////
const adminRouter= require('./adminroutes/adminroutes')
app.use("/admin",adminRouter)

////////////////user router////////////
const userRouter=require('./userroutes/userroutes')
app.use('/user',userRouter)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})