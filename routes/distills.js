const express = require('express');
const router = express.Router();
const distilleryLocModel = require('../model/distillery_locations');

/* GET home page. */
router.get('/', (req, res, next) => {
  distilleryLocModel.getAll().then(data => {
    res.json(data);
  })
  .catch(error => {
    res.status(500).json({message: 'Could not load distilleries'});
  })
});

module.exports = router;
