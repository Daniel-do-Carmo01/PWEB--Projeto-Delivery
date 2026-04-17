import { Router } from "express"
import { entregasController as controller } from "../bootstrap/bootstrap.js"

const router = Router()

router.get("/", controller.listarTodos)
router.get("/:id", controller.buscarPorId)
router.post("/", controller.criar)
router.patch("/:id/avancar", controller.avancar)
router.patch("/:id/cancelar", controller.cancelar)
router.patch("/:id/atribuir", controller.atribuir)
router.get("/:id/historico", controller.historico)

export default router
