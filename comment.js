// Create web server
// Start server
// Create a new comment
// Get all comments
// Get a specific comment
// Update a comment
// Delete a comment

// Importing modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create a new comment
app.post('/comment', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.send('Error reading file');
    } else {
      const comments = JSON.parse(data);
      const newComment = {
        id: comments.length + 1,
        body: req.body.body,
        postId: req.body.postId,
        userId: req.body.userId,
      };
      comments.push(newComment);
      fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.send('Error writing file');
        } else {
          res.send('Comment added successfully');
        }
      });
    }
  });
});

// Get all comments
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.send('Error reading file');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// Get a specific comment
app.get('/comment/:id', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.send('Error reading file');
    } else {
      const comments = JSON.parse(data);
      const comment = comments.find((c) => c.id === parseInt(req.params.id));
      res.send(comment);
    }
  });
});

// Update a comment
app.put('/comment/:id', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.send('Error reading file');
    } else {
      const comments = JSON.parse(data);
      const comment = comments.find((c) => c.id === parseInt(req.params.id));
      comment.body = req.body.body;
      fs.writeFile('comments.json', JSON.stringify(comments), (err) =>