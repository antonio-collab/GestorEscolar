exports.up = function(knex) {
    return knex.schema.createTable('students', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('directorId').unsigned().notNullable();
      table.foreign('directorId').references('id').inTable('directors');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('students');
  };
  