
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users',function(table){
    table.increments('id');
    table.text('username').notNullable().unique();
    table.text('display_name');
    table.text('email');
    table.integer('password');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
