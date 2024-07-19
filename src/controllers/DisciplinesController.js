const sqliteConnection = require("../database/sqlite")
const AppError = require("../ultils/AppError");
const {hash, compare} = require("bcryptjs")

class DisciplineController {
  // Método para criar uma nova disciplina
  async create(request, response) {
    const { name, directorId } = request.body;

    const database = await sqliteConnection();

    // Verificar se o diretor existe
    const directorExists = await database.get('SELECT * FROM directors WHERE id = ?', [directorId]);
    if (!directorExists) {
      throw new AppError('Diretor não encontrado');
    }

    await database.run(
      'INSERT INTO disciplines (name, directorId) VALUES (?, ?)',
      [name, directorId]
    );

    response.status(201).json();
  }

  // Método para atualizar uma disciplina existente
  async update(request, response) {
    const { id } = request.params;
    const { name, directorId } = request.body;

    const database = await sqliteConnection();
    const discipline = await database.get('SELECT * FROM disciplines WHERE id = ?', [id]);

    if (!discipline) {
      throw new AppError('Disciplina não encontrada');
    }

    // Verificar se o diretor existe
    const directorExists = await database.get('SELECT * FROM directors WHERE id = ?', [directorId]);
    if (!directorExists) {
      throw new AppError('Diretor não encontrado');
    }

    await database.run(
      'UPDATE disciplines SET name = ?, directorId = ? WHERE id = ?',
      [name, directorId, id]
    );

    response.status(200).json();
  }

  // Método para deletar uma disciplina
  async delete(request, response) {
    const { id } = request.params;

    const database = await sqliteConnection();
    const discipline = await database.get('SELECT * FROM disciplines WHERE id = ?', [id]);

    if (!discipline) {
      throw new AppError('Disciplina não encontrada');
    }

    await database.run('DELETE FROM disciplines WHERE id = ?', [id]);

    response.status(204).json();
  }

  // Método para listar todas as disciplinas
  async listAll(request, response) {
    const database = await sqliteConnection();
    const disciplines = await database.all('SELECT * FROM disciplines');
    response.status(200).json(disciplines);
  }

  // Método para listar uma disciplina por ID
  async listById(request, response) {
    const { id } = request.params;

    const database = await sqliteConnection();
    const discipline = await database.get('SELECT * FROM disciplines WHERE id = ?', [id]);

    if (!discipline) {
      throw new AppError('Disciplina não encontrada');
    }

    response.status(200).json(discipline);
  }
}

module.exports = DisciplineController;
