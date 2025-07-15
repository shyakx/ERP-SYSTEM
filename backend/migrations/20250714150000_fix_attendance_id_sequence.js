exports.up = async function(knex) {
  // Reset the sequence to the max id in the attendance table
  await knex.raw("SELECT setval('attendance_id_seq', (SELECT COALESCE(MAX(id), 0) FROM attendance));");
};

exports.down = async function(knex) {
  // No-op for down migration
}; 