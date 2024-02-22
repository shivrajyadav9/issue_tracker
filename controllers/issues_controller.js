import Label from '../models/label.js'
import Project from '../models/project.js';
import Issue from '../models/issue.js';

// create an issue
let create = async function (req, res) {

    try {
        // check if similar issue already exists
        let existingIssue = await Issue.findOne(
            {
                title: req.body.title,
                project: req.body.project
            }
        );
        if (existingIssue) {
            req.flash('error', 'Issue with this title already exists');
            return res.redirect(`/projects/project/${existingIssue.id}`);
        }

        let newIssue = await Issue.create({
            title: req.body.title,
            description: req.body.description,
            labels: req.body.labels,
            project: req.body.project,
            author: req.user._id
        });
        let project = await Project.findById(newIssue.project).populate('issues');
        project.issues.push(newIssue._id);
        project.save();

        req.flash('success', 'New Issue Created');
        return res.redirect('back');

    } catch (err) {
        req.flash('error', 'could not create issue');
        return res.redirect('back');
    }
}

let destroy=async function(req,res){
    let id=req.params.id;
    let issue=await Issue.findById(id);
    if(issue.author==req.user.id){
        await Issue.findByIdAndDelete(id);
        await Project.findByIdAndUpdate(issue.project,{$pull:{issues:req.params.id}})
    }
    return res.redirect('back');
}

let issuesController = { create,destroy };
export default issuesController;