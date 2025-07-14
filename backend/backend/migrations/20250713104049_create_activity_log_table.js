/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('activity_log', function(table) {
    table.increments('id').primary();
    table.timestamp('timestamp').defaultTo(knex.fn.now());
    table.string('type').notNullable();
    table.text('description').notNullable();
    table.integer('employee_id').unsigned().references('id').inTable('employees');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('activity_log');
};
