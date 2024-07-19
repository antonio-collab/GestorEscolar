const {Router} = require("express")
const DirectorController = require('../controllers/DirectorController');

const directorRoutes = Router()
const directorController = new DirectorController();

directorRoutes.post("/director", directorController.create)
directorRoutes.put("/director/:id", directorController.update)


module.exports = directorRoutes;
