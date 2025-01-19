import express from 'express';
import * as routesControllers from '../controllers/feed.js';
import { body } from 'express-validator';
const router = express.Router();

let isValid = [body('title').trim().isLength({ min: 5 }), body('content').trim().isLength({ min: 5 })];

router.get('/posts', routesControllers.getPosts);
router.post('/post', isValid, routesControllers.postPost);
router.get('/post/:postId', routesControllers.getPost);

export default router;
