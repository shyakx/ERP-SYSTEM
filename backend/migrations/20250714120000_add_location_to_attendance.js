exports.up = function(knex) {
  return knex.schema.table('attendance', function(table) {
    table.string('location');
  });
};

exports.down = function(knex) {
  return knex.schema.table('attendance', function(table) {
    table.dropColumn('location');
  });
}; 