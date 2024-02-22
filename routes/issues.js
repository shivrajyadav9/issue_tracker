import express from 'express';
const router = express.Router();
import passport from '../config/passport-local-strategy.js';

import issuesController from '../controllers/issues_controller.js';

router.post('/create',passport.checkAuthentication,issuesController.create);
router.get('/delete/:id',passport.checkAuthentication,issuesController.destroy);

export default router;