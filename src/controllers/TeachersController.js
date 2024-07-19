const sqliteConnection = require('../database/sqlite');
const AppError = require("../ultils/AppError");
const {hash, compare} = require("bcryptjs")

class TeacherController {
  async create(request, response) {
    const { name, email, password, phone } = request.body;

    const database = await sqliteConnection();
    const checkTeacherExists = await database.get('SELECT * FROM teachers WHERE email = ?', [email]);

    if (checkTeacherExists) {
      throw new AppError('Este e-mail já está em uso');
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      'INSERT INTO teachers (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, phone]
    );

    response.status(201).json();
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, password, old_password, phone } = request.body;

    const database = await sqliteConnection();
    const teacher = await database.get('SELECT * FROM teachers WHERE id = ?', [id]);

    if (!teacher) {
      throw new AppError('Professor não encontrado');
    }

    const teacherWithUpdatedEmail = await database.get('SELECT * FROM teachers WHERE email = ?', [email]);

    if (teacherWithUpdatedEmail && teacherWithUpdatedEmail.id !== teacher.id) {
      throw new AppError('Este e-mail já está em uso');
    }

    teacher.name = name ?? teacher.name;
    teacher.email = email ?? teacher.email;
    teacher.phone = phone ?? teacher.phone;

    if (password && !old_password) {
      throw new AppError('Você precisa informar a senha antiga para definir uma nova senha');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, teacher.password);

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere');
      }

      teacher.password = await hash(password, 8);
    }

    await database.run(
      `UPDATE teachers SET name = ?, email = ?, password = ?, phone = ? WHERE id = ?`,
      [teacher.name, teacher.email, teacher.password, teacher.phone, id]
    );

    response.status(200).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    const database = await sqliteConnection();
    const teacher = await database.get('SELECT * FROM teachers WHERE id = ?', [id]);

    if (!teacher) {
      throw new AppError('Professor não encontrado');
    }

    await database.run('DELETE FROM teachers WHERE id = ?', [id]);

    response.status(204).json();
  }
  async listAll(request, response) {
    const database = await sqliteConnection();
    const teachers = await database.all('SELECT * FROM teachers');
    response.status(200).json(teachers);
  }
}

module.exports = TeacherController;
