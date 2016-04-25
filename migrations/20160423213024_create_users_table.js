
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users',function(table){
    table.increments('id');
    table.text('username').unique();
    table.text('display_name');
    table.text('email');
    table.integer('points')
    table.integer('password');
    table.text('fb_id');
    table.text('google_id')
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
