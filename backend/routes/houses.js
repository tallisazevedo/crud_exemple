const express = require('express');
const House = require('../models/house');
const router = express.Router();

router.post('/', (req, res) => {
  const house = req.body;
  House.create(house, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('House created successfully');
  });
});

router.get('/', (req, res) => {
  House.findAll((err, houses) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(houses);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  House.findById(id, (err, house) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(house);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const house = req.body;
  House.update(id, house, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('House updated successfully');
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  House.delete(id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('House deleted successfully');
  });
});

module.exports = router;
