exports.up = function(knex) {
  return knex.schema.table('attendance', function(table) {
    table.text('notes');
  });
};

exports.down = function(knex) {
  return knex.schema.table('attendance', function(table) {
    table.dropColumn('notes');
  });
}; 