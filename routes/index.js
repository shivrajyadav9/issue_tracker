import express from 'express';
const router = express.Router();
console.log('router added successfully');

import homeController from '../controllers/home_controller.js';
router.get('/', homeController);

import usersRouter from'./users.js';
router.use('/users', usersRouter);

import projectsRouter from './projects.js';
router.use('/projects',projectsRouter);

import labelsRouter from './labels.js';
router.use('/labels',labelsRouter);

import issuesRouter from './issues.js';
router.use('/issues',issuesRouter);


export default router;