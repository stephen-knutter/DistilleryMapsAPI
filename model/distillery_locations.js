const knex = require('./config');

let query = {
  getAll: () => {
    return knex('distillery_locations');
  },

  getDistillByState: (state) => {
    return knex('distillery_locations').where('slug', state);
  }
};

module.exports = query;
