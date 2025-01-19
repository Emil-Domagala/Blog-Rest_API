import express from 'express';
import { validationResult } from 'express-validator';
import { PostModel as Post } from '../models/post.js';

const catchError = (err, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({ message: 'Fetched posts successgully', posts });
  } catch (err) {
    catchError(err, next);
  }
};

export const postPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entred data is incorrect');
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided');
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;

  const post = new Post({
    title,
    content,
    creator: { name: 'Emil' },
    imageUrl,
  });
  try {
    const result = await post.save();
    res.status(201).json({
      message: 'Post created',
      post: result,
    });
  } catch (err) {
    catchError(err, next);
  }
};

export const getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ message: 'Post fetched', post });
  } catch (err) {
    catchError(err, next);
  }
};
