
exports.up = function(knex, Promise) {
  return knex.schema.table('users',function(table){
    table.text('profilePicture');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users',function(table){
    table.dropColumn('profilePicture');
  })
};
