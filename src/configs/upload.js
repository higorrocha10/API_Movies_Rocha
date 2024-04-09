// Configuraciones para utilizarlas en el upload.
const path = require("path")
const multer = require("multer") // Biblioteca para hacer uploads.
const crypto = require("crypto") // Crear hash de forma aleatoria.

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex")
      const fileName = `${fileHash}-${file.originalname}`

      //callback: devolución de llamada para determinar el nombre del archivo cargado.
      return callback(null, fileName)
    },
  }),
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}
