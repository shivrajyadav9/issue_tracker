import mongoose from 'mongoose';
import env from './environment.js';

mongoose.connect(env.mongodb_uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function () {
    console.log('connected to Database :: MongoDB');
});

export default db;
