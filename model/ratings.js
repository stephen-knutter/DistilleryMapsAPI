const knex = require('./config');

query = {
  getDistilleryRatingsById: (distillID, limit, offset) => {
    return knex.raw(
      `SELECT ratings.*,
      users.*,
      (SELECT count(*) FROM ratings WHERE distill_id=${distillID}) AS rating_count,
      (SELECT SUM(rating) AS rating_total FROM ratings WHERE distill_id=${distillID})
      FROM ratings
      INNER JOIN users ON ratings.user_id = users.id
      WHERE ratings.distill_id=${distillID}
      ORDER BY ratings.created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}`
    );
  },

  getUserRatingsById: (userID, limit, offset) => {
    return knex.raw(
      `SELECT ratings.*,
      distilleries.*,
      (SELECT count(*) FROM ratings WHERE user_id=${userID}) AS rating_count,
      (SELECT SUM(rating) AS rating_total FROM ratings WHERE user_id=${userID})
      FROM ratings
      INNER JOIN distilleries ON ratings.distill_id = distilleries.id
      WHERE ratings.user_id=${userID}
      ORDER BY ratings.created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}`
    );
  },
  
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
  }
}

module.exports = query;
