import express from 'express';
const router = express.Router();
import passport from '../config/passport-local-strategy.js';

import projectsController from '../controllers/projects_controller.js';

router.get('/project/:id',projectsController.project);
// router.get('/project/filter/:id',projectsController.filter);
router.get('/create-form',passport.checkAuthentication,projectsController.createForm);
router.post('/create',passport.checkAuthentication,projectsController.create);
router.get('/delete/:id',projectsController.destroy);

export default router;