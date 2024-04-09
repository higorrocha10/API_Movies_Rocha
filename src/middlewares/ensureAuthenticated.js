const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  // Saber si no hay nada dentro.
  if (!authHeader) {
    throw new AppError("JWT Token no informado!", 401)
  }
  // Cogiendo la 2ª posición del array y añadieno la variable token.
  const [, token] = authHeader.split(" ")

  try {
    // Verificar si el token es válido. Nos devuelve un sub.
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    // Agregando un nuevo objeto dentro de la petición llamado user con la propriedad id.
    request.user = {
      id: Number(user_id),
    }

    return next() // Llamar a la función destino.
  } catch {
    throw new AppError("JWT Token inválido!", 401)
  }
}

module.exports = ensureAuthenticated
