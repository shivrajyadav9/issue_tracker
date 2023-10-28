import express from 'express';
const router = express.Router();
import passport from '../config/passport-local-strategy.js';

import labelsController from '../controllers/labels_controller.js';

router.post('/create',passport.checkAuthentication,labelsController.create);

export default router;