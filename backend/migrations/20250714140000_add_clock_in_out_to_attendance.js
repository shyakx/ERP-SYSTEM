exports.up = function(knex) {
  return knex.schema.table('attendance', function(table) {
    table.string('clock_in');
    table.string('clock_out');
  });
};

exports.down = function(knex) {
  return knex.schema.table('attendance', function(table) {
    table.dropColumn('clock_in');
    table.dropColumn('clock_out');
  });
}; 