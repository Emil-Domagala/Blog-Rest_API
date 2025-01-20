import express from 'express';
import * as authControllers from '../controllers/auth.js';
import { body } from 'express-validator';
import { UserModel as User } from '../models/user.js';

const router = express.Router();

const isValid = [body('email').isEmail().withMessage('Please enter a valid email')];

router.put('/signup', authControllers.signupUser);

export default router;
