const {Router} = require("express")
const DisciplinesController = require('../controllers/DisciplinesController');

const disciplinesRoutes = Router()
const disciplinesController = new DisciplinesController();

disciplinesRoutes.post("/discipline", disciplinesController.create)
disciplinesRoutes.put("/discipline/:id", disciplinesController.update)
disciplinesRoutes.get("/discipline", disciplinesController.listAll)
disciplinesRoutes.delete("/discipline/:id", disciplinesController.delete)

module.exports = disciplinesRoutes;