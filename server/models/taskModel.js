// const mongoose= require("mongoose");

// const taskSchema=new mongoose.Schema({

//     tasktitle:{
//         type:String,
//         require:true

//     },
//     taskdetail:String,


//     taskduration:String,
//     status: { type:String, default: "Incomplete"},

//     userid : { type: mongoose.Types.ObjectId, ref: "user" } 

// })


// module.exports = mongoose.model("task", taskSchema); 



const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    tasktitle: {
        type: String,
        required: [true, "Task title is required"],
        trim: true,
      
    },
    taskdetail: {
        type: String,
        trim: true,
        
    },
    taskduration: {
        type: String,
       
    },
    status: { 
        type: String, 
       
    },
    priority: {
        type: String,
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type:Date
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    
    userid: { 
        type: mongoose.Types.ObjectId, 
        ref: "user",
        required: true
    }
});

// Update the updatedAt field before saving
taskSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Task", taskSchema);