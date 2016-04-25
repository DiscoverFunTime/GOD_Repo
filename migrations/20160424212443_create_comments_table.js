
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments',function(table){
    table.increments('id');
    table.text('comment');
    table.integer('user_id').unsigned().index().references('users.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};
