/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('employees', function(table) {
    table.string('address');
    table.string('avatar');
    table.integer('leave_balance').defaultTo(21);
    table.date('date_of_birth');
    table.string('national_id');
    table.string('gender');
    table.string('emergency_contact');
    table.string('status').defaultTo('active');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('employees', function(table) {
    table.dropColumn('address');
    table.dropColumn('avatar');
    table.dropColumn('leave_balance');
    table.dropColumn('date_of_birth');
    table.dropColumn('national_id');
    table.dropColumn('gender');
    table.dropColumn('emergency_contact');
    table.dropColumn('status');
  });
};
