const {Router} = require("express")
const ClassController = require('../controllers/ClassController');

const classRoutes = Router()
const classController = new ClassController();

classRoutes.get("/class", classController.getAll)
classRoutes.post("/class", classController.create)
classRoutes.put("/class/:id", classController.update)
classRoutes.delete("/class/:id", classController.delete)


module.exports = classRoutes;