
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post_tag',function(table){
    table.increments('id');
    table.integer('post_id').unsigned().index().references('posts.id');
    table.text('tag');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post_tag');
};
