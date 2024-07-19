const {Router} = require("express")
const StudentController = require('../controllers/StudentController');

const studentRouter = Router()
const studentController = new StudentController();

studentRouter.post("/student", studentController.create)
studentRouter.put("/student/:id", studentController.update)
studentRouter.delete("/student/:id", studentController.delete)


module.exports = studentRouter;