import { Router } from "express"
import { Database } from "../database/database.js"
import { EntregasRepository } from "../repositories/entregas.repositories.js"
import { EntregasService } from "../services/entregas.service.js"
import { EntregasController } from "../controllers/entregas.controller.js"

const database = new Database()
const repository = new EntregasRepository(database)
const service = new EntregasService(repository)
const controller = new EntregasController(service)

const router = Router()

router.get("/", controller.listarTodos)
router.get("/:id", controller.buscarPorId)
router.post("/", controller.criar)
router.patch("/:id/avancar", controller.avancar)
router.patch("/:id/cancelar", controller.cancelar)
router.get("/:id/historico", controller.historico)      

export default router