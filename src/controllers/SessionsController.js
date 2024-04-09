const knex = require("../database/knex") // Conexión banco de datos.
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()

    // Validando si el usuario existe en la base de datos sino existe salta el error.
    if (!user) {
      throw new AppError("Correo o contraseña incorrecta!", 401)
    }
    // Comparando clave de la base de datos con la introducida por el usuario.
    const passwordMatched = await compare(password, user.password)

    // Verificando si las claves no han coincido.
    if (!passwordMatched) {
      throw new AppError("Correo electrónico o contraseña incorrectos!", 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      // Insertando dentro del token el ID del usuario.
      subject: String(user.id),
      expiresIn,
    })

    return response.json({ user, token })
  }
}

module.exports = SessionsController
