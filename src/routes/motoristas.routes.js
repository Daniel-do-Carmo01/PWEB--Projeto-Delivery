import { Router } from "express"
import { motoristasController as controller } from "../bootstrap/bootstrap.js"

const router = Router()

router.get("/", controller.listarTodos)
router.get("/:id", controller.buscarPorId)
router.post("/", controller.criar)
router.get("/:id/entregas", controller.listarEntregas)

export default router
