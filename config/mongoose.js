import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://shivraj:mongodbcluster@cluster0.fk9lx9t.mongodb.net/issueTracker?retryWrites=true&w=majority');
// mongoose.connect('mongodb://0.0.0.0:27017/issue_tracker_development');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function () {
    console.log('connected to Database :: MongoDB');

});


export default db;
