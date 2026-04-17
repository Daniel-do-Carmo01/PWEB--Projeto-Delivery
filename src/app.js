import express from "express"
import entregasRouter from "./routes/entregas.routes.js"
import motoristasRouter from "./routes/motoristas.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"

const app = express()
app.use(express.json())

app.use("/api/entregas", entregasRouter)
app.use("/api/motoristas", motoristasRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
