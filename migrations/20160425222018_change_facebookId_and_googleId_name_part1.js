
exports.up = function(knex, Promise) {
  return knex.schema.table('users',function(table){
    table.dropColumn('fb_id');
    table.dropColumn('google_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users',function(table){
    table.text('fb_id');
    table.text('google_id');
  })
};
