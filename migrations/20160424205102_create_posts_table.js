
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts',function(table){
    table.increments('id');
    table.text('url');
    table.integer('user_id').unsigned().index().references('users.id');
    table.text('description');
    table.text('location');
    table.float('lat');
    table.float('long');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts')
};
