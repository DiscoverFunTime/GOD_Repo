
exports.up = function(knex, Promise) {
  return knex.schema.table('users',function(table){
    table.dropColumn('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.integer('password');
  })
};
