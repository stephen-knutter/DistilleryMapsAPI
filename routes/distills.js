const express = require('express');
const router = express.Router();

const helpers = require('../model/helpers');

const distilleryLocModel = require('../model/distillery_locations');
const distilleryStoreModel = require('../model/distillery_stores');
const favoriteModel = require('../model/favorites');


router.get('/', (req, res, next) => {
  distilleryLocModel.getAll().then(data => {
    res.json(data);
  })
  .catch(error => {
    res.status(500).json({message: "Could not load distilleries"});
  })
});

router.post('/favorite', (req, res, next) => {
  let distillID = req.body.distillID;
  let authorized = req.headers.authorization;

  if (authorized) {
    let userID = helpers.getUserIdFromToken(authorized);
    if (userID) {
      favoriteModel.addNewFavorite(distillID, userID)
        .then((response) => {
          res.json({following: true});
        })
        .catch((err) => {
          res.send({error: {"Already": "favorited this distillery"}});
        })
    } else {
      res.json({following: false});
    }
  } else {
    res.json({following: false});
  }
});

router.post('/unfavorite', (req, res, next) => {
  let distillID = req.body.distillID;
  let authorized = req.headers.authorization;

  if (authorized) {
    let userID = helpers.getUserIdFromToken(authorized);
    if (userID) {
      favoriteModel.removeFavorite(distillID, userID)
        .then((response) => {
          res.json({following: false});
        })
        .catch((err) => {
          res.send({error: {"Already": "favorited this distillery"}});
        })
    } else {
      res.json({following: true});
    }
  } else {
    res.json({following: true});
  }
});

router.get('/distill/:distillSlug', (req, res, next) => {
  let distillSlug = req.params.distillSlug;
  console.log('slug: ', distillSlug);
  distilleryStoreModel.getDistillBySlug(distillSlug)
    .then((distillery) => {
      console.log('distillery: ', distillery[0]);
      res.json({distilleryProfile: distillery[0]});
    })
    .catch((err) => {
      res.status(500).send({error: {"Ooops": "could not find distillery"}});
    })
});

router.get('/distill/following/:distillSlug', (req, res, next) => {
  let distillSlug = req.params.distillSlug;
  let authorized = req.headers.authorization;

  if (authorized && authorized !== undefined) {
    let userID = helpers.getUserIdFromToken(authorized);
    if (userID) {
      distilleryStoreModel.getDistillIdFromSlug(distillSlug)
        .then((response) => {
          return response[0].id;
        })
        .then((distillID) => {
          return favoriteModel.hasUserFavoritedDistill(distillID, userID);
        })
        .then((favoriteCheck) => {
          if (favoriteCheck.length > 0) {
            res.json({following: true});
          } else {
            res.json({following: false});
          }
        })
    } else {
      res.json({following: false});
    }
  } else {
      res.json({following: false});
  }
})

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
