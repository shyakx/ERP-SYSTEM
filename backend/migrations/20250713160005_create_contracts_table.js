exports.up = function(knex) {
  return knex.schema.createTable('contracts', function(table) {
    table.increments('id').primary();
    table.string('employee_id', 10).notNullable().references('id').inTable('employees');
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.string('status').defaultTo('pending');
    table.string('file_url');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('contracts');
}; 