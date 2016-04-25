
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clans',function(table){
    table.increments('id');
    table.text('clan_name');
    table.integer('user_id').unsigned().index().references('users.id');
    table.integer('points');
    table.text('intro');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clans');
};
