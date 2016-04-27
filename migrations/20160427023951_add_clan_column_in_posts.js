
exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.text('clan').defaultTo('global');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.dropColumn('clan')
  })
};
