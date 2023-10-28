import User from '../models/user.js';

import fs from 'fs';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


let signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('user_sign_in', {
        title: 'Sign In'
    });
}

let signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user_sign_up', {
        title: 'Sign Up'
    });
}
//get the sign up data
let create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Password does not match');
        return res.redirect('back');
    }
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            await User.create(req.body)
            req.flash('success', 'Account created successfully !!');
            return res.redirect('/users/sign-in');

        } else {
            req.flash('error', 'Account already exists');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }
}

//sign in and create a session for the user
let createSession = function (req, res) {
    req.flash('success', 'Logged in successfully!!');
    return res.redirect('/');
}

let destroySession = function (req, res) {
    req.logOut((err) => {
        if (err) {
            req.flash('error', 'Could not log out');
            console.log('Error', err);
            return res.redirect('/');
        } else {
            req.flash('success', 'You have logged out !!');
            return res.redirect('/');
        }
    });

}

let usersController = {
    signIn,
    signUp,
    create,
    createSession,
    destroySession
}
export default usersController;