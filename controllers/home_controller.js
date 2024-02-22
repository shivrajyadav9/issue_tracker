import Project from '../models/project.js'

// render the home view and pass list of the projects to home view
let home = async function (req, res) {
    try {
        let projects=await Project.find({}).populate('author');
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