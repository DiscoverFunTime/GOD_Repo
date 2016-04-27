
exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.decimal('lat',20)
    table.decimal('long',20)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table){
    table.dropColumn('lat',20)
    table.dropColumn('long',20)
  })
};
