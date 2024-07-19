const { Router } = require('express');
const ClassroomController = require('../controllers/ClassroomController'); // Corrigido o nome

const classroomRoutes = Router();
const classroomController = new ClassroomController();

// Rota para listar todas as salas de aula
classroomRoutes.get('/classrooms', classroomController.index); // Corrigido para `index`

// Rota para criar uma nova sala de aula
classroomRoutes.post('/classrooms', classroomController.create);

// Rota para obter uma sala de aula específica por ID
classroomRoutes.get('/classrooms/:id', classroomController.show); // Adicionado método show

// Rota para atualizar uma sala de aula
classroomRoutes.put('/classrooms/:id', classroomController.update);

// Rota para excluir uma sala de aula
classroomRoutes.delete('/classrooms/:id', classroomController.delete);

module.exports = classroomRoutes;
