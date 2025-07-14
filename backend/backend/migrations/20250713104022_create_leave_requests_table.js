/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('leave_requests', function(table) {
    table.increments('id').primary();
    table.integer('employee_id').unsigned().notNullable().references('id').inTable('employees');
    table.string('type').notNullable();
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.string('status').defaultTo('pending');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('leave_requests');
};
