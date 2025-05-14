const mongoose =  require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:String,
    tags:[String],
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    publised:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now()}
})

module.exports =  mongoose.model('Post',postSchema)