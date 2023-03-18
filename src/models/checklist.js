import mongoose from "mongoose";

const checklistSchema = mongoose.Schema({
    name: { type: String, require: true },
    // tasks: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Task'
    // }]
});

export default mongoose.model('Checklist', checklistSchema);