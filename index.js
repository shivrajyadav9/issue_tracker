import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
const port = 1000;

import expressLayouts from 'express-ejs-layouts';
import db from './config/mongoose.js';
import session from 'express-session';
import passport from 'passport';
import passportLocal from './config/passport-local-strategy.js';
import MongoStore from 'connect-mongo';
import sassMiddleware from 'node-sass-middleware';
import flash from 'connect-flash';
import customMware from './config/middleware.js';

import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(sassMiddleware({
    src: path.join(__dirname, './assets/scss'),
    dest: path.join(__dirname, './assets/css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(session({
    name: 'issue_tracker',//name of the key
    secret: 'blahsomething',//key to generate encripted kays
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://0.0.0.0/issue_tracker_development',
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok mongostore ');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

import indexRouter from './routes/index.js';
app.use('/', indexRouter);

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})