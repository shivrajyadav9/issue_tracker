import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    labels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Label'
        }
    ],
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

const Issue = mongoose.model('Issue', issueSchema);
export default Issue;