exports.up = function(knex) {
  return knex.schema.table('activity_log', function(table) {
    table.string('activity_type');
    table.json('details');
  });
};

exports.down = function(knex) {
  return knex.schema.table('activity_log', function(table) {
    table.dropColumn('activity_type');
    table.dropColumn('details');
  });
}; 