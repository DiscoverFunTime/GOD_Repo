
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_postlike',function(table){
    table.increments('id');
    table.integer('user_id').unsigned().index().references('users.id');
    table.integer('post_id').unsigned().index().references('posts.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_postlike');
};
