const sqliteConnection = require("../database/sqlite")
const AppError = require("../ultils/AppError");

class FrequencyController {
  async create(request, response) {
    const { classroomId, studentId, present } = request.body;

    const database = await sqliteConnection();

    // Verifica se a sala de aula existe
    const classExists = await database.get('SELECT * FROM classrooms WHERE id = ?', [classroomId]);
    if (!classExists) {
      throw new AppError('Sala de aula não encontrada', 404);
    }

    // Verifica se o aluno existe
    const studentExists = await database.get('SELECT * FROM students WHERE id = ?', [studentId]);
    if (!studentExists) {
      throw new AppError('Aluno não encontrado', 404);
    }

    // Insere um novo registro de frequência
    await database.run(
      'INSERT INTO frequencies (classroomId, studentId, present, dateRecorded) VALUES (?, ?, ?, ?)',
      [classroomId, studentId, present, new Date()]
    );

    response.status(201).json({ message: 'Frequência registrada com sucesso' });
  }

  async index(request, response) {
    const database = await sqliteConnection();
    const frequencies = await database.all('SELECT * FROM frequencies');
    response.json(frequencies);
  }

  async show(request, response) {
    const { id } = request.params;
    const database = await sqliteConnection();
    const frequency = await database.get('SELECT * FROM frequencies WHERE id = ?', [id]);

    if (!frequency) {
      throw new AppError('Frequência não encontrada', 404);
    }

    response.json(frequency);
  }

  async update(request, response) {
    const { id } = request.params;
    const { classroomId, studentId, present } = request.body;

    const database = await sqliteConnection();

    // Verifica se o registro de frequência existe
    const frequencyExists = await database.get('SELECT * FROM frequencies WHERE id = ?', [id]);
    if (!frequencyExists) {
      throw new AppError('Frequência não encontrada', 404);
    }

    // Atualiza o registro de frequência
    await database.run(
      'UPDATE frequencies SET classroomId = ?, studentId = ?, present = ?, dateRecorded = ? WHERE id = ?',
      [classroomId, studentId, present, new Date(), id]
    );

    response.json({ message: 'Frequência atualizada com sucesso' });
  }

  async delete(request, response) {
    const { id } = request.params;
    const database = await sqliteConnection();

    // Verifica se o registro de frequência existe
    const frequencyExists = await database.get('SELECT * FROM frequencies WHERE id = ?', [id]);
    if (!frequencyExists) {
      throw new AppError('Frequência não encontrada', 404);
    }

    // Deleta o registro de frequência
    await database.run('DELETE FROM frequencies WHERE id = ?', [id]);

    response.status(204).send();
  }
}

module.exports = FrequencyController;
