const knex = require('./config');

let query = {
  hasUserFavoritedDistill: (distillID, userID) => {
    return knex('favorites')
            .where('distill_id', distillID)
            .andWhere('user_id', userID);
  },

  addNewFavorite: (distillID, userID) => {
    return knex('favorites').insert({
      distill_id: distillID,
      user_id: userID
    })
    .returning('id');
  },

  removeFavorite: (distillID, userID) => {
    return knex('favorites')
      .where('distill_id', distillID)
      .andWhere('user_id', userID)
      .del();
  }
}

module.exports = query;
