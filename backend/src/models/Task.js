import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'completed'],
        default: 'active',
    },
    completeAt: {
        type: Date,
        default: null,
    },
},
    {
        timestamps: true, // createAt, updateAt tu dong them vao
    });
const Task = mongoose.model("Task", taskSchema);
export default Task;