const express = require('express');
const { Router } = express;
const router = Router();

router.post('/login', (req, res) => {
  const body = req.body;
});
router.post('/signup', (req, res) => {
  const body = req.body;
});

module.exports = router;
