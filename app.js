import express from "express"
import entregasRouter from "./src/routes/entregas.routes.js"
import { errorMiddleware } from "./src/middlewares/error.middleware.js"

const app = express()
app.use(express.json())

app.use("/api/entregas", entregasRouter)

app.use(errorMiddleware)

export default app