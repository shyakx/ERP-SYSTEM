exports.up = function(knex) {
  return knex.schema.createTable('employees', function(table) {
    table.string('id', 10).primary();
    table.string('name').notNullable();
    table.string('position');
    table.string('department');
    table.string('email');
    table.string('phone');
    table.date('hire_date');
    table.string('role');
    table.string('password');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('employees');
}; 