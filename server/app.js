import express from 'express';
import feedRoutes from './routes/feed.js';
import authRoutes from './routes/auth.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import multer from 'multer';
import { Server as SocketServer } from 'socket.io';
import { socketConfig } from './socket.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json(message, data);
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    const server = app.listen(process.env.SERVER_PORT);
    const io = socketConfig.init(server);
  })
  .catch((err) => console.log(err));
