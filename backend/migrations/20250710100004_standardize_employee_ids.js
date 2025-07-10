/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Get all employees
  const employees = await knex('employees').select('id');

  for (const emp of employees) {
    // If the ID is a number (not already DIC format)
    if (/^\d+$/.test(emp.id)) {
      // Pad with zeros to 3 digits
      const newId = `DIC${emp.id.toString().padStart(3, '0')}`;
      await knex('employees').where({ id: emp.id }).update({ id: newId });
    }
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
