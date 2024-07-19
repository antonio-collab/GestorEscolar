exports.up = function(knex) {
    return knex.schema.createTable('classrooms', (table) => {
      table.increments('id').primary();
      table.datetime('date').defaultTo(knex.fn.now()).notNullable();
      table.string('topic').notNullable();
      table.integer('disciplineId').unsigned().notNullable();
      table.foreign('disciplineId').references('id').inTable('disciplines');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('classrooms');
  };
  