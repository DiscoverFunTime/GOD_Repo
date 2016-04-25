
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post_comment',function(table){
    table.increments('id');
    table.integer('post_id').unsigned().index().references('posts.id');
    table.integer('comment_id').unsigned().index().references('comments.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post_comment');
};
