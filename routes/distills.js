const express = require('express');
const router = express.Router();
const distilleryModel = require('../model/distilleries');

/* GET home page. */
router.get('/', (req, res, next) => {
  let distilleries = distilleryModel.getAll().then(data => {
    res.json(data);
  })
  .catch(error => {
    res.status(500).json({message: 'Could not load distilleries'});
  })
});

module.exports = router;
