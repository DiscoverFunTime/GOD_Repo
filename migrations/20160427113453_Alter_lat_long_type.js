
exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.dropColumn('lat')
    table.dropColumn('long')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.float('lat')
    table.float('long')
  })
};
