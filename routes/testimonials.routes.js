const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const message = { message: 'OK' };

router.route('/testimonials').get((req, res) => {
  res.json(db.testimionals);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimionals.filter((item) => item.id == req.params.id));
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimionals[Math.floor(Math.random() * db.testimionals.length)]);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const newTestimonial = {
    id: uuidv4(),
    author: author,
    text: text,
  };
  db.testimionals.push(newTestimonial);
  res.json(message);
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const editedTestimonial = db.testimionals.find((item) => item.id == req.params.id);
  const indexOfTestimonial = db.testimionals.indexOf(editedTestimonial);
  const newTestimonial = {
    ...editedTestimonial,
    author: author,
    text: text,
  };
  db.testimionals[indexOfTestimonial] = newTestimonial;
  res.json(message);
});

router.route('/testimonials/:id').delete((req, res) => {
  const editedTestimonial = db.testimionals.find((item) => item.id == req.params.id);
  const indexOfTestimonial = db.testimionals.indexOf(editedTestimonial);
  db.testimionals.splice(indexOfTestimonial, 1);
  res.json(message);
});

module.exports = router;