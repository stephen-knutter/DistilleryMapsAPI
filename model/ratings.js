const knex = require('./config');

query = {
  addRating: (userID, distillID, comment, rating) => {
    return knex('ratings').insert({
      distill_id: distillID,
      user_id: userID,
      rating: rating,
      comment: comment
    })
    .returning('id');
  },

  getRatingById: (ratingID) => {
    return knex('ratings')
      .select('ratings.id',
              'ratings.distill_id',
              'ratings.rating',
              'ratings.comment',
              'ratings.created_at',
              'users.username',
              'users.slug',
              'users.profile_pic')
      .innerJoin('users', 'ratings.user_id', 'users.id')
      .innerJoin('distilleries', 'ratings.distill_id', 'distilleries.id')
      .orderBy('ratings.created_at', 'desc')
      .where('ratings.id', ratingID);
  },

  getDistilleryRatingsById: (distillID) => {
    return knex('ratings')
    .innerJoin('users', 'ratings.user_id', 'users.id')
    .orderBy('ratings.created_at', 'desc')
    .where('distill_id', distillID);
  },

  getUserRatingsById: (userID) => {
    return knex('ratings')
      .innerJoin('distilleries', 'ratings.distill_id', 'distilleries.id')
      .orderBy('ratings.created_at', 'desc')
      .where('user_id', userID);
  }
}

module.exports = query;
