exports.up = function(knex) {
  return knex.schema.createTable('leave_requests', function(table) {
    table.increments('id').primary();
    table.string('employee_id', 10).notNullable().references('id').inTable('employees');
    table.string('type').notNullable();
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.string('status').defaultTo('pending');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('leave_requests');
}; 