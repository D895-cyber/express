const express = require('express')
const mongoose =  require("mongoose")
const app = express();
const blogRouter = require('./routes/BlogRoutes')
app.use(express.json());
const authRoutes = require('./routes/auth')

mongoose.connect('mongodb+srv://dev:dev123@cluster0.es90y1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("successfully");
}).catch((err)=>console.log(err))
app.use('/auth', authRoutes);
app.use('/api',blogRouter)

app.listen(4000,()=>{
    console.log("running on 4000");
})