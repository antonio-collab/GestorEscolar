exports.up = function(knex) {
    return knex.schema.table('classrooms', (table) => {
      table.datetime('date').defaultTo(knex.fn.now()).alter().notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('classrooms', (table) => {
      table.datetime('date').defaultTo(null).alter().notNullable();
    });
  };
  