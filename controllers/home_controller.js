import Project from '../models/project.js'

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