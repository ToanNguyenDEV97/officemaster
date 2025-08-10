import { Router } from 'express';
import coursesHandler from './v1/courses.js';
import postsHandler from './v1/posts.js';
import pathsHandler from './v1/paths.js';
import usersHandler from './v1/users.js';
import forumHandler from './v1/forum.js';
import enrollmentsHandler from './v1/enrollments.js';

const router = Router();

router.use('/courses', coursesHandler);
router.use('/posts', postsHandler);
router.use('/paths', pathsHandler);
router.use('/users', usersHandler);
router.use('/forum', forumHandler);
router.use('/enrollments', enrollmentsHandler);

export default router;
