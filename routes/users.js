import express from 'express';
const router = express.Router();
import passport from 'passport';


console.log('router added successfully');

import usersController from '../controllers/users_controller.js';

router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);

router.post('/create', usersController.create);

//use passport ass a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),usersController.createSession)

router.get('/sign-out',usersController.destroySession);

export default router;