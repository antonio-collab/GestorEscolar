const sqliteConnection = require("../database/sqlite");
const AppError = require("../ultils/AppError");
const knex = require("../../src/database/knex")


class ClassController {

  async create(request, response) {
    const { name, directorId } = request.body

    const database = await sqliteConnection();

    const checkDirectorExists = await database.get('SELECT * FROM directors WHERE id = ?', [directorId]);

    if (!checkDirectorExists) {
      throw new AppError('Diretor não encontrado');
    }

     await database.run(
      'INSERT INTO classes (name, directorId) VALUES (?, ?)',
      [name, directorId]
    );

    response.status(201).json();
  }

  async update(request, response) {
    const { name, directorId } = request.body;
    const { id } = request.params;

    const db = await sqliteConnection();

    // Verificar se a classe existe
    const classExists = await db.get('SELECT * FROM classes WHERE id = ?', [id]);

    if (!classExists) {
      throw new AppError('Class not found', 404);
    }

    // Verificar se o diretor existe
    const directorExists = await db.get('SELECT * FROM directors WHERE id = ?', [directorId]);

    if (!directorExists) {
      throw new AppError('Director not found', 404);
    }

    // Atualizar a classe
    await db.run('UPDATE classes SET name = ?, directorId = ? WHERE id = ?', [name, directorId, id]);

    response.status(200).json({ id, name, directorId });
  }

  async delete(request, response) {
    const { id } = request.params;

    const db = await sqliteConnection();

    // Verificar se a classe existe
    const classExists = await db.get('SELECT * FROM classes WHERE id = ?', [id]);

    if (!classExists) {
      throw new AppError('Class not found', 404);
    }

    // Deletar a classe
    await db.run('DELETE FROM classes WHERE id = ?', [id]);

    response.status(204).send();
  }

  async getAll(request, response) {
    const db = await sqliteConnection();

    // Buscar todas as classes
    const classes = await db.all('SELECT * FROM classes');

    response.status(200).json(classes);
  }

  async getById(request, response) {
    const { id } = request.params;

    const db = await sqliteConnection();

    // Buscar a classe pelo ID
    const classExists = await db.get('SELECT * FROM classes WHERE id = ?', [id]);

    if (!classExists) {
      throw new AppError('Class not found', 404);
    }

    response.status(200).json(classExists);
  }
}

module.exports = ClassController;
