/**
 * @typedef {Object} Motorista
 * @property {number} id
 * @property {string} nome
 * @property {string} cpf
 * @property {string} placaVeiculo
 * @property {string} status - "ATIVO" | "INATIVO"
 */

/**
 * @interface IMotoristasRepository
 *
 * @method listarTodos
 * @returns {Promise<Motorista[]>}
 *
 * @method buscarPorId
 * @param {number} id
 * @returns {Promise<Motorista|null>}
 *
 * @method buscarPorCPF
 * @param {string} cpf
 * @returns {Promise<Motorista|null>}
 *
 * @method criar
 * @param {{ nome: string, cpf: string, placaVeiculo: string }} dados
 * @returns {Promise<Motorista>}
 *
 * @method atualizar
 * @param {number} id
 * @param {Partial<Motorista>} dados
 * @returns {Promise<Motorista|null>}
 */

export class MotoristasRepository {
    constructor(database) {
        this.database = database
    }

    async listarTodos() {
        return this.database.getMotoristas()
    }

    async buscarPorId(id) {
        return this.database.getMotoristas().find((m) => m.id === id) ?? null
    }

    async buscarPorCPF(cpf) {
        return this.database.getMotoristas().find((m) => m.cpf === cpf) ?? null
    }

    async criar(dados) {
        const motoristas = this.database.getMotoristas()
        const novoMotorista = {
            id: this.database.generateMotoristasId(),
            ...dados,
            status: "ATIVO"
        }
        motoristas.push(novoMotorista)
        return novoMotorista
    }

    async atualizar(id, dados) {
        const motoristas = this.database.getMotoristas()
        const i = motoristas.findIndex((m) => m.id === id)
        if (i === -1) return null
        motoristas[i] = { ...motoristas[i], ...dados, id }
        return motoristas[i]
    }
}
