const express = require('express');
const router = express.Router();
const distilleryLocModel = require('../model/distillery_locations');
const distilleryStoreModel = require('../model/distillery_stores');

router.get('/', (req, res, next) => {
  distilleryLocModel.getAll().then(data => {
    res.json(data);
  })
  .catch(error => {
    res.status(500).json({message: 'Could not load distilleries'});
  })
});

router.get('/distill/:distillSlug', (req, res, next) => {
  let distillSlug = req.params.distillSlug;
  distilleryStoreModel.getDistillBySlug(distillSlug)
    .then((distillery) => {
      console.log('distillery: ', distillery[0]);
      res.json({distilleryProfile: distillery[0]});
    })
    .catch((err) => {
      res.status(500).send({error: {"Ooops": " could not find distillery"}})
    })
});

router.get('/all/:stateAbbr', (req, res, next) => {
  let stateAbbr = req.params.stateAbbr.toUpperCase();
  distilleryStoreModel.getDistillsByState(stateAbbr)
    .then((distilleries) => {
      res.json({listings: distilleries});
    });
});

router.get('/:state', (req, res, next) => {
  let state = req.params.state;
  distilleryLocModel.getDistillByState(state)
    .then((distilleries) => {
      res.json({distilleries: distilleries[0]});
    })
    .catch((err) => {
      res.status(500).send({error: {"Ooops": "something went wrong"}});
    })
});

module.exports = router;
