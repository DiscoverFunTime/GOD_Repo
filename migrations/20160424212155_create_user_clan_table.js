
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_clan', function(table){
    table.increments('id');
    table.integer('user_id').unsigned().index().references('users.id');
    table.integer('clan_id').unsigned().index().references('clans.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_clan');
};
