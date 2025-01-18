import express from 'express';

export const getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: 1,
        title: 'First',
        content: 'Content',
        imageUrl: 'images/my_photo.jpg',
        creator: { name: 'Emil' },
        createdAt: new Date(),
      },
    ],
  });
};

export const postPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: 'Post created',
    post: { _id: new Date().toISOString(), title, content, creator: { name: 'Emil' }, createdAt: new Date() },
  });
};
