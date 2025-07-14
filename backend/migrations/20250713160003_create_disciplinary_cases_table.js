exports.up = function(knex) {
  return knex.schema.createTable('disciplinary_cases', function(table) {
    table.increments('id').primary();
    table.string('employee_id', 10).notNullable().references('id').inTable('employees');
    table.string('case_type').notNullable();
    table.text('description');
    table.string('status').defaultTo('open');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('disciplinary_cases');
}; 