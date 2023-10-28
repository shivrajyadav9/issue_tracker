
import Project from '../models/project.js';
import User from '../models/user.js';
import Issue from '../models/issue.js';


let createForm = function (req, res) {
    return res.render('project-create-form', {
        title: 'Create a new project'
    })
}

//create an issue

let create = async function (req, res) {
    try {
        const existingProject = await Project.findOne(
            {
                name: req.body.name,
                author: req.user._id
            }
        )
        if (existingProject) {
            return res.redirect(`/projects/project/${existingProject.id}`)

        } else {

            let newProject = await Project.create({
                name: req.body.name,
                description: req.body.description,
                author: req.user.id
            });
            req.flash('success', 'Project Added Successfully');
            return res.redirect(`/projects/project/${newProject.id}`);
        }
    } catch (err) {
        req.flash('error', " Coudn't add Project");
        console.log('error in creating project', err);
    }

}


//SHOW the Project Page

let project = async function (req, res) {
    try {
        let project = await Project.findById(req.params.id)
            .populate('author')
            .populate('labels')
            .populate({
                path: 'issues',
                populate: [
                    {
                        path: 'labels'
                    },
                    {
                        path: 'author',
                        select: 'name'
                    }
                ]
            });

        let all_users = await User.find({});


        //SEARCH ISSUES

        if (req.query.search && req.query.search.length > 0) {
            const issues = await Issue.find({
                $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { description: { $regex: req.query.search, $options: 'i' } },
                ],
            }).populate([
                {
                    path: 'labels'
                },
                {
                    path: 'author',
                    select: 'name'
                }
            ]);

            if (project) {
                return res.render('project', {
                    project: project,
                    authors: all_users,
                    issues: issues,
                    searchTerm: req.query.search,
                    title: "project"
                });
            }
            else {
                return res.redirect('back')
            }

        }

        //FILTER ISSUES

        let query = {};
        if (req.query.labels) {
            if (typeof (req.query.labels) == 'object') {
                query.labels = { $in: req.query.labels };
            } else {
                query.labels = req.query.labels
            }
        }
        if (req.query.authors) {
            if (typeof (req.query.authors) == 'object') {
                query.author = { $in: req.query.authors };
            } else {
                query.author = req.query.authors
            }
        }

        let issues = await Issue.find(query).populate([
            {
                path: 'labels'
            },
            {
                path: 'author',
                select: 'name'
            }
        ]);


        if (project) {
            return res.render('project', {
                project: project,
                authors: all_users,
                issues: issues,
                title: "project"
            });
        }
        else {
            return res.redirect('back')
        }
    } catch (err) {
        req.flash('error', 'Internal Server Error');
        console.log('error in loading project', err);
    }
}


let projectsController = { createForm, create, project };
export default projectsController;