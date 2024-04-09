const { Router } = require("express")
const tagsRoutes = Router()

// Nuestro middleware de autenticación.
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const TagsController = require("../controllers/TagsController")

const tagsController = new TagsController()

tagsRoutes.get("/", ensureAuthenticated, tagsController.index)

module.exports = tagsRoutes
