import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'issue_tracker_development',
    mongodb_uri: 'mongodb://0.0.0.0:27017/issue_tracker_development'
}

const production = {
    name: 'production',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'issue_tracker_development',
    mongodb_uri: 'mongodb+srv://vercel-admin-user-65749921cfd0db7119502f37:zMeYyDKYK7lxtf0p@cluster0.fk9lx9t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}

export default eval(process.env.MONGODB_URI == undefined ? development : production);