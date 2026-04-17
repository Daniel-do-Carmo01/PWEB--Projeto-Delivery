import { AppError } from "../utils/AppError.js"

export class MotoristasService {
    constructor(repository) {
        this.repository = repository
    }

    async listarTodos() {
        return this.repository.listarTodos()
    }

    async buscarPorId(id) {
        const motorista = await this.repository.buscarPorId(id)
        if (!motorista) throw new AppError("Motorista não encontrado", 404)
        return motorista
    }

    async criar({ nome, cpf, placaVeiculo }) {
        const existente = await this.repository.buscarPorCPF(cpf)
        if (existente) {
            throw new AppError(`Já existe um motorista cadastrado com o CPF ${cpf}`, 409)
        }
        return this.repository.criar({ nome, cpf, placaVeiculo })
    }
}
