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

router.get('/:state', (req, res, next) => {
  let state = req.params.state;
  distilleryLocModel.getDistillByState(state)
    .then((distilleries) => {
      res.json({distilleries: distilleries[0]});
    })
    .catch((err) => {
      res.status(500).send({error: {"Ooops": "something went wrong"}});
    })
})

module.exports = router;
