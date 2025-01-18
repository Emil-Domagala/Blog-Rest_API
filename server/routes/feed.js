import express from 'express';
import * as routesControllers from '../controllers/feed.js';
const router = express.Router();

router.get('/posts', routesControllers.getPosts);
router.post('/post', routesControllers.postPost);

export default router;
