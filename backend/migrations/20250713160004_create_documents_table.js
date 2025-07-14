exports.up = function(knex) {
  return knex.schema.createTable('documents', function(table) {
    table.increments('id').primary();
    table.string('employee_id', 10).notNullable().references('id').inTable('employees');
    table.string('type').notNullable();
    table.string('file_url');
    table.date('expiry_date');
    table.string('status').defaultTo('pending');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('documents');
}; 