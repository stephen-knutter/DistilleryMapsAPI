const knex = require('./config');

let query = {
  getAll: () => {
    return knex('distillery_locations');
  }
};

module.exports = query;
