const sqliteConnection = require("../database/sqlite")
const {hash, compare} = require("bcryptjs")
const AppError = require("../ultils/AppError")  // Assumindo que você tem uma classe AppError para tratamento de erros


class DirectorController {
  async create(request, response) {
    const { name, phone, email, password } = request.body;

    const database = await sqliteConnection();
    const checkDirectorExists = await database.get('SELECT * FROM directors WHERE email = ?', [email]);

    if (checkDirectorExists) {
      throw new AppError('Este e-mail já está em uso');
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      'INSERT INTO directors (name, phone, email, password) VALUES (?, ?, ?, ?)',
      [name, phone, email, hashedPassword]
    );

    response.status(201).json();
  }

  async update(request, response) {
    const { name, phone, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const director = await database.get('SELECT * FROM directors WHERE id = ?', [id]);

    if (!director) {
      throw new AppError('Diretor não encontrado');
    }

    const directorWithUpdatedEmail = await database.get('SELECT * FROM directors WHERE email = ?', [email]);

    if (directorWithUpdatedEmail && directorWithUpdatedEmail.id !== director.id) {
      throw new AppError('Este e-mail já está em uso');
    }

    director.name = name ?? director.name;
    director.phone = phone ?? director.phone;
    director.email = email ?? director.email;

    if (password && !old_password) {
      throw new AppError('Você precisa informar a senha antiga para definir a nova senha');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, director.password);

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere');
      }

      director.password = await hash(password, 8);
    }

    await database.run(
      'UPDATE directors SET name = ?, phone = ?, email = ?, password = ? WHERE id = ?',
      [director.name, director.phone, director.email, director.password, id]
    );

    return response.json();
  }
}

module.exports = DirectorController;
