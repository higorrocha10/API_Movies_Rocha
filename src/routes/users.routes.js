const { Router, response } = require("express")
const usersRoutes = Router()

const uploadConfig = require("../configs/upload")

const multer = require("multer")
const upload = multer(uploadConfig.MULTER)

// Nuestro middleware de autenticación.
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const UsersController = require("../controllers/UsersController")
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)

const UserAvatarController = require("../controllers/UserAvatarController")
const userAvatarController = new UserAvatarController()

//Ruta para upload del avatar. patch: Actualizar un determinado campo.
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
)

module.exports = usersRoutes
