import Project from '../models/project.js'

// render the home view and pass list of the projects to home view
let home = async function (req, res) {
    try {
        let projects=await Project.find({}).populate('author');
        console.log(projects[0]);
        return res.render('home', {
            title: 'Home',
            projects:projects
        });
    }
    catch (err) {
        console.log('Error', err);
        return;
    }
}

export default home;