exports.up = function(knex) {
  return knex.schema.createTable('announcements', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.enum('type', ['general', 'hr', 'operations', 'finance', 'security']).defaultTo('general');
    table.enum('priority', ['low', 'medium', 'high']).defaultTo('medium');
    table.string('created_by').references('id').inTable('employees');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('expires_at');
    table.enum('status', ['active', 'inactive', 'expired']).defaultTo('active');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('announcements');
}; 