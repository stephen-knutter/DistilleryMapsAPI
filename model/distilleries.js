const knex = require('./config');

let query = {
  getAll: () => {
    return knex('distilleries');
  }
};

module.exports = query;
