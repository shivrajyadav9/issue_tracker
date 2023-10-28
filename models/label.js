import mongoose from 'mongoose';

const labelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    issues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue'
    }],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Label = mongoose.model('Label', labelSchema);
export default Label;