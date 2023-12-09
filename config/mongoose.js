import mongoose from 'mongoose';
import env from './environment.js';

// mongoose.connect(`mongodb://0.0.0.0:27017/${env.db}`);
//mongodb + srv://vercel-admin-user-65749921cfd0db7119502f37:zMeYyDKYK7lxtf0p@cluster0.fk9lx9t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// mongoose.connect("mongodb+srv://vercel-admin-user-65749921cfd0db7119502f37:zMeYyDKYK7lxtf0p@cluster0.fk9lx9t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function () {
    console.log('connected to Database :: MongoDB');
});

export default db;
