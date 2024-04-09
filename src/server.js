require("express-async-errors")
require("dotenv/config")
const migrationsRun = require("./database/sqlite/migrations")
migrationsRun()

const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")

//Cross-Origin Resource Sharing (CORS) / El intercambio de recursos entre orígenes diferentes.
// Para que el back-end pueda atender las peticiones del front-end.
const cors = require("cors")

const express = require("express")
const routes = require("./routes")

const app = express()
app.use(cors())
app.use(express.json())

//Para poder mostrar la imagen del usuario. static: Sirve archivos estáticos
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

// Tratamiento de EXCEPCIONES.
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  return response.status(500).json({
    status: "ERROR",
    message: "Error interno del servidor!",
  })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
