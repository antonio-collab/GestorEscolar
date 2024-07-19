const {Router} = require("express")
const ClassController = require('../controllers/TeachersController');
const TeacherController = require("../controllers/TeachersController");

const teacherRoutes = Router()
const teacherController = new TeacherController();

teacherRoutes.get("/teacher", teacherController.listAll)
teacherRoutes.post("/teacher", teacherController.create)
teacherRoutes.put("/teacher/:id", teacherController.update)
teacherRoutes.delete("/teacher/:id", teacherController.delete)


module.exports = teacherRoutes;