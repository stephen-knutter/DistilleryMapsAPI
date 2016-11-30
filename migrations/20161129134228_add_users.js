
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (t) => {
    t.increments();
    t.string('username');
    t.string('slug');
    t.string('profile_pic').defaultTo('user-placeholder.png');
    t.string('email');
    t.string('password_digest');
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    t.unique(['username', 'slug', 'email']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
