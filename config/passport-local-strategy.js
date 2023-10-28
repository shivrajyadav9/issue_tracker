import passport from 'passport';

import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

import User from '../models/user.js';

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    async function (req, email, password, done) {

        //find the user and establish the identity
        try {
            let user = await User.findOne({ email: email })
            if (!user || user.password != password) {
                req.flash('error', 'Invalid username/password')
                return done(null, false);
            }
            return done(null, user);
        }
        catch (err) {
            console.log('error in finding user --> passport');
            req.flash('error', err);
            return done(err);
        }
    }
));

//serialize the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

//deserializing the user from the key in the cookies

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .catch((err) => {
            console.log('error in finding user --> passport');
            return done(err);
        })
        .then((user) => {
            
            return done(null, user);
        })
});

//check if the user is authenticated

passport.checkAuthentication = function (req, res, next) {

    if (req.isAuthenticated()) {
        next();
        return;
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

export default passport;