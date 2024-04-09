const fs = require("fs") // Nos permite trabajar y manipular los archivos.
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      // stat: Devuelve el estado del archivo. Si está abierto/disponible o está malo.
      await fs.promises.stat(filePath)
    } catch {
      return
    }
    // unlink: Función para borrar el archivo.
    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage
