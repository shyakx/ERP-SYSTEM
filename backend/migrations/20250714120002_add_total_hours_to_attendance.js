exports.up = function(knex) {
  return knex.schema.table('attendance', function(table) {
    table.decimal('total_hours', 5, 2);
  });
};

exports.down = function(knex) {
  return knex.schema.table('attendance', function(table) {
    table.dropColumn('total_hours');
  });
}; 