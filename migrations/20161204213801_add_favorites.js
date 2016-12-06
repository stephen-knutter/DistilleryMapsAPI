
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', (t) => {
    t.increments();
    t.integer('distill_id').references('id').inTable('distilleries').notNullable();
    t.integer('user_id').references('id').inTable('users').notNullable();
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    t.unique(['distill_id', 'user_id']);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
