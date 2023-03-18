import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    name: { type: String, require: true },
    done: { type: Boolean, default: false },
    checklistId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

export default mongoose.model('Task', taskSchema);