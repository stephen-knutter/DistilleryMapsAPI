
exports.up = function(knex, Promise) {
  return knex.schema.createTable('distillery_locations', (t) => {
    t.increments();
    t.string('state');
    t.string('abbr');
    t.string('slug');
    t.decimal('lat',8,6).notNullable();
    t.decimal('lng',9,6).notNullable();
    t.string('country_code');
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('distillery_locations');
};
