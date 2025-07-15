exports.up = function(knex) {
  return knex.schema.table('attendance', function(table) {
    table.string('approval_status').defaultTo('pending');
    table.integer('shift_id').references('id').inTable('shifts');
    table.string('logged_by');
    table.string('approved_by');
  });
};

exports.down = function(knex) {
  return knex.schema.table('attendance', function(table) {
    table.dropColumn('approval_status');
    table.dropColumn('shift_id');
    table.dropColumn('logged_by');
    table.dropColumn('approved_by');
  });
}; 