// Composição única de todas as dependências da aplicação.
// Nenhum service ou controller deve instanciar repositories diretamente.

import { Database } from "../database/database.js"
import { EntregasRepository } from "../repositories/entregas.repositories.js"
import { MotoristasRepository } from "../repositories/motoristas.repositories.js"
import { EntregasService } from "../services/entregas.service.js"
import { MotoristasService } from "../services/motoristas.service.js"
import { EntregasController } from "../controllers/entregas.controller.js"
import { MotoristasController } from "../controllers/motoristas.controller.js"

const database = new Database()

const entregasRepo = new EntregasRepository(database)
const motoristasRepo = new MotoristasRepository(database)

const entregasService = new EntregasService(entregasRepo, motoristasRepo)
const motoristasService = new MotoristasService(motoristasRepo)

export const entregasController = new EntregasController(entregasService)
export const motoristasController = new MotoristasController(motoristasService, entregasService)
