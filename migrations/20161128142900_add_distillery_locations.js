
exports.up = function(knex, Promise) {
  return knex.schema.createTable('distillery_locations', (t) => {
    t.increments();
    t.string('state');
    t.string('abbr');
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {

};
