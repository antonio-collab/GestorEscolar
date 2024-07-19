const sqliteConnection = require('../database/sqlite');
const AppError = require("../ultils/AppError");

class StudentController {
  async create(request, response) {
    const { name, directorId } = request.body;

    const database = await sqliteConnection();

    // Verificar se o diretor existe
    const checkDirectorExists = await database.get('SELECT * FROM directors WHERE id = ?', [directorId]);

    if (!checkDirectorExists) {
      throw new AppError('Diretor não encontrado');
    }

    await database.run(
      'INSERT INTO students (name, directorId) VALUES (?, ?)',
      [name, directorId]
    );

    response.status(201).json();
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, directorId } = request.body;

    const database = await sqliteConnection();
    const student = await database.get('SELECT * FROM students WHERE id = ?', [id]);

    if (!student) {
      throw new AppError('Estudante não encontrado');
    }

    if (directorId) {
      const checkDirectorExists = await database.get('SELECT * FROM directors WHERE id = ?', [directorId]);

      if (!checkDirectorExists) {
        throw new AppError('Diretor não encontrado');
      }

      student.directorId = directorId;
    }

    student.name = name ?? student.name;

    await database.run(
      `UPDATE students SET name = ?, directorId = ? WHERE id = ?`,
      [student.name, student.directorId, id]
    );

    response.status(200).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const database = await sqliteConnection();
    const student = await database.get('SELECT * FROM students WHERE id = ?', [id]);

    if (!student) {
      throw new AppError('Estudante não encontrado');
    }

    await database.run('DELETE FROM students WHERE id = ?', [id]);

    response.status(204).json();
  }
}

module.exports = StudentController;
