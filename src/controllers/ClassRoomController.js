const knex = require('../database/knex'); // Certifique-se de que o knex está corretamente configurado e exportado

class ClassroomController {
  // Criar uma nova sala de aula
  async create(request, response) {
    const { topic, disciplineId } = request.body;

    try {
      const [newClassroom] = await knex('classrooms').insert({
        topic,
        disciplineId
      }).returning('*'); // Retorna o novo registro inserido

      response.status(201).json(newClassroom);
    } catch (error) {
      console.error('Error creating classroom:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  }

  // Listar todas as salas de aula
  async index(request, response) {
    try {
      const classrooms = await knex('classrooms').select('*');
      response.status(200).json(classrooms);
    } catch (error) {
      console.error('Error fetching classrooms:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  }

  // Obter uma sala de aula específica por ID
  async show(request, response) {
    const { id } = request.params;

    try {
      const classroom = await knex('classrooms').where({ id }).first();
      if (!classroom) {
        return response.status(404).json({ error: 'Classroom not found' });
      }
      response.status(200).json(classroom);
    } catch (error) {
      console.error('Error fetching classroom:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  }

  // Atualizar uma sala de aula
  async update(request, response) {
    const { id } = request.params;
    const { topic, disciplineId } = request.body;

    try {
      const updatedRows = await knex('classrooms').where({ id }).update({
        topic,
        disciplineId
      });

      if (updatedRows === 0) {
        return response.status(404).json({ error: 'Classroom not found' });
      }

      const updatedClassroom = await knex('classrooms').where({ id }).first();
      response.status(200).json(updatedClassroom);
    } catch (error) {
      console.error('Error updating classroom:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  }

  // Excluir uma sala de aula
  async delete(request, response) {
    const { id } = request.params;

    try {
      const deletedRows = await knex('classrooms').where({ id }).del();

      if (deletedRows === 0) {
        return response.status(404).json({ error: 'Classroom not found' });
      }

      response.status(204).send(); // No content
    } catch (error) {
      console.error('Error deleting classroom:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = ClassroomController;
