exports.up = function(knex) {
  return knex.schema.createTable('activity_log', function(table) {
    table.increments('id').primary();
    table.timestamp('timestamp').defaultTo(knex.fn.now());
    table.string('type').notNullable();
    table.text('description').notNullable();
    table.string('employee_id', 10).references('id').inTable('employees');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('activity_log');
}; 