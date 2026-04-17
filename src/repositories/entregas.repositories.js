/**
 * @typedef {Object} Entrega
 * @property {number} id
 * @property {string} descricao
 * @property {string} origem
 * @property {string} destino
 * @property {string} status - "CRIADA" | "EM_TRANSITO" | "ENTREGUE" | "CANCELADA"
 * @property {number|null} motoristaId
 * @property {Array<{data: string, descricao: string}>} historico
 */

/**
 * @interface IEntregasRepository
 *
 * @method listarTodos
 * @param {{ status?: string, motoristaId?: number }} [filtros]
 * @returns {Promise<Entrega[]>}
 *
 * @method buscarPorId
 * @param {number} id
 * @returns {Promise<Entrega|null>}
 *
 * @method criar
 * @param {{ descricao: string, origem: string, destino: string }} dados
 * @returns {Promise<Entrega>}
 *
 * @method atualizar
 * @param {number} id
 * @param {Partial<Entrega>} dados
 * @returns {Promise<Entrega|null>}
 */

export class EntregasRepository {
    constructor(database) {
        this.database = database
    }

    async listarTodos(filtros = {}) {
        let entregas = this.database.getEntregas()

        if (filtros.status) {
            entregas = entregas.filter((e) => e.status === filtros.status)
        }

        if (filtros.motoristaId !== undefined) {
            entregas = entregas.filter((e) => e.motoristaId === filtros.motoristaId)
        }

        return entregas
    }

    async buscarPorId(id) {
        return this.database.getEntregas().find((e) => e.id === id) ?? null
    }

    async criar(dados) {
        const entregas = this.database.getEntregas()
        const novaEntrega = {
            id: this.database.generateEntregaId(),
            ...dados,
            motoristaId: null,
            status: "CRIADA",
            historico: [{
                data: new Date().toISOString(),
                descricao: "Entrega Criada"
            }]
        }
        entregas.push(novaEntrega)
        return novaEntrega
    }

    async atualizar(id, dados) {
        const entregas = this.database.getEntregas()
        const i = entregas.findIndex((e) => e.id === id)
        if (i === -1) return null
        entregas[i] = { ...entregas[i], ...dados, id }
        return entregas[i]
    }
}
