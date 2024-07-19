const {Router} = require("express")
const UserController = require("../controllers/UserController")
const usersRoutes = Router()

const usersController = new UserController()


function myMiddleware(request, response, next){

console.log("Você passou pelo middleware!")

next()

}


usersRoutes.post("/", myMiddleware,usersController.create)
usersRoutes.put("/:id", usersController.update)

module.exports = usersRoutes;