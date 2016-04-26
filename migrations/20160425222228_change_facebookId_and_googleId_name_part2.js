
exports.up = function(knex, Promise) {
  return knex.schema.table('users',function(table){
    table.text('facebookId');
    table.text('googleId');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users',function(table){
    table.dropColumn('facebookId');
    table.dropColumn('googleId');
  })
};
