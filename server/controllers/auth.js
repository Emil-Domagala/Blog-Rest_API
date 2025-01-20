import { UserModel as User } from '../models/user';

const catchError = (err, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
    next(err);
  }
};

export const signupUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entred data is incorrect');
    error.statusCode = 422;
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  const user = new User({
    email,
    name,
    password,
  });
  try {
    const result = await user.save();
    res.status(201).json({
      message: 'Post created',
      post: result,
    });
  } catch (err) {
    catchError(err, next);
  }
};
