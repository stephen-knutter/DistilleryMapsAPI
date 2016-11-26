
exports.up = function(knex, Promise) {
  return knex.schema.createTable('distilleries', (t) => {
    t.increments();
    t.string('name').notNullable();
    t.string('address').notNullable();
    t.decimal('lat',8,6).notNullable();
    t.decimal('lng',9,6).notNullable();
    t.integer('zip').notNullable();
    t.string('email').notNullable().defaultTo('example@email.com');
    t.string('picture').notNullable().defaultTo('distillery-pic.png');
    t.string('phone').notNullable().defaultTo('555-555-5555');
    t.string('website').notNullable().defaultTo('www.example.com');
    t.string('region');
    t.string('hood');
    t.string('state');
    t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('distilleries');
};
