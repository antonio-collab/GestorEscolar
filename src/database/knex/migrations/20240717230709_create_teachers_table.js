exports.up = function(knex) {
    return knex.schema.createTable('teachers', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('phone').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('teachers');
  };
  