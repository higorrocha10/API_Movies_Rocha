const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const avatarFilename = request.file.filename

    // Instancia de DiskStorage
    const diskStorage = new DiskStorage()

    const user = await knex("users").where({ id: user_id }).first()

    // Verificando si el usuario no existe.
    if (!user) {
      throw new AppError(
        "Sólo usuarios autenticados pueden cambiar la imagen de perfil",
        401
      )
    }

    // Verificando si existe una imagen anterior, si existe borramos y ponemos la nueva.
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename

    await knex("users").update(user).where({ id: user_id })

    return response.json(user)
  }
}

module.exports = UserAvatarController
