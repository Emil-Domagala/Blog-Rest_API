import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const err = new Error('Not authenticated.');
    err.statusCode = 401;
    throw err;
  }
  const token = req.get('Authorization').split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWTSECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const err = new Error('Not authenticated.');
    err.statusCode = 401;
    throw err;
  }
  req.userId = decodedToken.userId;
  next();
};
