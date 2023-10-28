import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    labels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label'
    }],
    issues:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue'
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

export default Project;