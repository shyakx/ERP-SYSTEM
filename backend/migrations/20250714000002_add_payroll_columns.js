/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('payroll', function(table) {
    // Add new allowance columns
    table.decimal('transport_allowance', 10, 2).defaultTo(0);
    table.decimal('housing_allowance', 10, 2).defaultTo(0);
    table.decimal('performance_bonus', 10, 2).defaultTo(0);
    table.decimal('night_shift_allowance', 10, 2).defaultTo(0);
    
    // Add new deduction columns
    table.decimal('tax_deduction', 10, 2).defaultTo(0);
    table.decimal('insurance_deduction', 10, 2).defaultTo(0);
    table.decimal('loan_deduction', 10, 2).defaultTo(0);
    table.decimal('other_deductions', 10, 2).defaultTo(0);
    
    // Add audit columns (only if they don't exist)
    table.string('processed_by');
    table.string('paid_by');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('payroll', function(table) {
    // Remove new columns
    table.dropColumn('transport_allowance');
    table.dropColumn('housing_allowance');
    table.dropColumn('performance_bonus');
    table.dropColumn('night_shift_allowance');
    table.dropColumn('tax_deduction');
    table.dropColumn('insurance_deduction');
    table.dropColumn('loan_deduction');
    table.dropColumn('other_deductions');
    table.dropColumn('processed_by');
    table.dropColumn('paid_by');
  });
}; 