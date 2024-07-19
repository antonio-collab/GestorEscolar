exports.up = function(knex) {
    return knex.schema.createTable('frequencies', (table) => {
      table.increments('id').primary();
      table.integer('classroomId').unsigned().notNullable();
      table.integer('studentId').unsigned().notNullable();
      table.boolean('present').notNullable();
      table.datetime('dateRecorded').defaultTo(knex.fn.now()).notNullable();
      table.foreign('classroomId').references('id').inTable('classrooms');
      table.foreign('studentId').references('id').inTable('students');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('frequencies');
  };
  