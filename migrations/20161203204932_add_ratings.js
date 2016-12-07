
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', (t) => {
    t.increments();
    t.integer('distill_id').notNullable();
    t.integer('user_id').notNullable();
    t.integer('rating').notNullable();
    t.text('comment').notNullable();
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};
