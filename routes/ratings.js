const express = require('express');
const router = express.Router();
const escape = require('escape-html');
const ratingModel = require('../model/ratings');
const distilleryStoreModel = require('../model/distillery_stores');
const userModel = require('../model/users');

router.get('/users/:userSlug', (req, res, next) => {
  let userSlug = req.params.userSlug;
  let limit = req.query.limit || 5;
  let offset = req.query.offset || 0;

  userModel.getUserIdFromSlug(userSlug)
    .then((response) => {
      return response[0].id
    })
    .then((userID) => {
      return ratingModel.getUserRatingsById(userID, limit, offset);
    })
    .then((userRatings) => {
      res.json({ratings: userRatings.rows});
    })
    .catch((err) => {
      res.status(500).send({error: {"Oooops": "something went wrong"}});
    })
});

router.get('/distills/:distillSlug', (req, res, next) => {
  let distillSlug = req.params.distillSlug;
  let limit = req.query.limit || 5;
  let offset = req.query.offset || 0;

  distilleryStoreModel.getDistillIdFromSlug(distillSlug)
    .then((response) => {
      return response[0].id;
    })
    .then((distillID) => {
      return ratingModel.getDistilleryRatingsById(distillID, limit, offset);
    })
    .then((distillRatings) => {
      res.json({ratings: distillRatings.rows});
    })
    .catch((err) => {
      res.status(500).send({error: {"Ooops": "something went wrong"}});
    })
});

router.post('/new', (req, res, next) => {
  let ratingInfo = req.body;
  let userID = ratingInfo.userId;
  let distillID = ratingInfo.distillId;
  let comment = escape(ratingInfo.comment);
  let rating = ratingInfo.rating;

  if (!userID || !distillID || !comment || !rating) {
    res.status(500).send({error: {"Must": "add a rating and comment"}});
  } else {
    ratingModel.addRating(userID, distillID, comment, rating)
      .then((response) => {
        return response[0];
      })
      .then((ratingId) => {
        return ratingModel.getRatingById(ratingId);
      })
      .then((data) => {
        res.json({rating: data[0]});
      })
      .catch((err) => {
        res.status(500).send({error: {"Ooops": "something went wrong"}});
      })
  }
});

module.exports = router;
