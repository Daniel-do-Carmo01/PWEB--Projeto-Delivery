import { AppError } from "../utils/AppError.js"

const TRANSICOES_VALIDAS = {
    CRIADA: "EM_TRANSITO",
    EM_TRANSITO: "ENTREGUE"
}

const STATUS_FINAIS = ["ENTREGUE", "CANCELADA"]

export class EntregasService {
    constructor(repository, motoristasRepository) {
        this.repository = repository
        this.motoristasRepository = motoristasRepository
    }

    async listarTodos({ status, motoristaId } = {}) {
        const filtros = {}
        if (status) filtros.status = status
        if (motoristaId !== undefined) filtros.motoristaId = motoristaId
        return this.repository.listarTodos(filtros)
    }

    async buscarPorId(id) {
        const entrega = await this.repository.buscarPorId(id)
        if (!entrega) throw new AppError("Entrega não encontrada", 404)
        return entrega
    }

    async criar({ descricao, origem, destino }) {
        if (origem === destino) {
            throw new AppError("Origem e Destino não podem ser iguais", 400)
        }

        const todas = await this.repository.listarTodos()
        const duplicadas = todas.find(
            (e) =>
                e.descricao === descricao &&
                e.origem === origem &&
                e.destino === destino &&
                !STATUS_FINAIS.includes(e.status)
        )

        if (duplicadas) {
            throw new AppError("Existe uma entrega ativa com a mesma descrição, origem e destino", 409)
        }

        return this.repository.criar({ descricao, origem, destino })
    }

    async avancar(id) {
        const entrega = await this.buscarPorId(id)

        if (STATUS_FINAIS.includes(entrega.status)) {
            throw new AppError(`Não é possível avançar uma entrega com status ${entrega.status}`, 400)
        }

        const proximo = TRANSICOES_VALIDAS[entrega.status]
        if (!proximo) {
            throw new AppError("Transição inválida", 400)
        }

        const novoHistorico = [
            ...entrega.historico,
            {
                data: new Date().toISOString(),
                descricao: `Status avançado para ${proximo}`
            }
        ]

        return this.repository.atualizar(id, { status: proximo, historico: novoHistorico })
    }

    async cancelar(id) {
        const entrega = await this.buscarPorId(id)

        if (entrega.status === "ENTREGUE") {
            throw new AppError("Não é possível cancelar uma entrega já entregue", 400)
        }
        if (entrega.status === "CANCELADA") {
            throw new AppError("Entrega já cancelada", 400)
        }

        const novoHistorico = [
            ...entrega.historico,
            {
                data: new Date().toISOString(),
                descricao: "Entrega cancelada"
            }
        ]

        return this.repository.atualizar(id, { status: "CANCELADA", historico: novoHistorico })
    }

    async atribuir(id, motoristaId) {
        const entrega = await this.buscarPorId(id)

        if (entrega.status !== "CRIADA") {
            throw new AppError(
                `Não é possível atribuir motorista a uma entrega com status ${entrega.status}`,
                422
            )
        }

        const motorista = await this.motoristasRepository.buscarPorId(motoristaId)
        if (!motorista) throw new AppError("Motorista não encontrado", 404)

        if (motorista.status === "INATIVO") {
            throw new AppError("Não é possível atribuir um motorista inativo", 422)
        }

        const descricaoHistorico = entrega.motoristaId
            ? `Motorista substituído para ${motorista.nome}`
            : `Motorista ${motorista.nome} atribuído`

        const novoHistorico = [
            ...entrega.historico,
            {
                data: new Date().toISOString(),
                descricao: descricaoHistorico
            }
        ]

        return this.repository.atualizar(id, { motoristaId, historico: novoHistorico })
    }

    async historico(id) {
        const entrega = await this.buscarPorId(id)
        return entrega.historico
    }
}
