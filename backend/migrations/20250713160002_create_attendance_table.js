exports.up = function(knex) {
  return knex.schema.createTable('attendance', function(table) {
    table.increments('id').primary();
    table.string('employee_id', 10).notNullable().references('id').inTable('employees');
    table.date('date').notNullable();
    table.string('status').notNullable();
    table.timestamp('check_in');
    table.timestamp('check_out');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('attendance');
}; 