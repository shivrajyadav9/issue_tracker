import Label from '../models/label.js'
import Project from '../models/project.js'

let create = async function (req, res) {
    try {
        // check if the label already exists
        let existinglabel = await Label.findOne({
            project: req.body.project,
            title: req.body.title
        });
        if (existinglabel) {
            req.flash('error', 'Label already exists')
            return res.redirect('back');
        }
        let newLabel = await Label.create({
            title: req.body.title,
            project: req.body.ptoject
        });
        // add label to the array of labels in the project Object
        let project = await Project.findById(req.body.project).populate('labels');
        project.labels.push(newLabel._id);
        await project.save();

        req.flash('success', 'Label Created !!');
        return res.redirect('back');
    }
    catch (err) {
        req.flash('error', 'could not create label');
        return res.redirect('back');
    }
}
let labelsController = { create };
export default labelsController;