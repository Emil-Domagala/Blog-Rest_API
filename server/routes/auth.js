import express from 'express';
import * as authControllers from '../controllers/auth.js';
import { body } from 'express-validator';
import { UserModel as User } from '../models/user.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

const signUpValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email is already in use');
      }
    })
    .normalizeEmail(),
  body('password').trim().isLength({ min: 5 }),
  body('name').trim().not().isEmpty(),
];

const updateStatusValidation = [body('status').trim().not().isEmpty()];

router.put('/signup', signUpValidation, authControllers.signupUser);
router.post('/login', authControllers.loginUser);
router.put('/status', isAuth, updateStatusValidation, authControllers.updateStatus);
router.get('/status', isAuth, authControllers.getStatus);

export default router;
