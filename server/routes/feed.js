import express from 'express';
import * as routesControllers from '../controllers/feed.js';
import { body } from 'express-validator';
import { isAuth } from '../middleware/isAuth.js';
const router = express.Router();

let isValid = [body('title').trim().isLength({ min: 5 }), body('content').trim().isLength({ min: 5 })];

router.get('/posts', isAuth, routesControllers.getPosts);
router.post('/post', isAuth, isValid, routesControllers.postPost);
router.get('/post/:postId', isAuth, routesControllers.getPost);
router.put('/post/:postId', isAuth, isValid, routesControllers.updatePost);
router.delete('/post/:postId', isAuth, routesControllers.deletePost);

export default router;
