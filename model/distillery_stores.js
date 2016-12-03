const knex = require('./config');

let query = {
  getDistillsByState: (stateAbbr) => {
    return knex('distilleries').where('state', stateAbbr);
  },

  getDistillBySlug: (distillSlug) => {
    return knex('distilleries').where('slug', distillSlug);
  }
};

module.exports = query;
