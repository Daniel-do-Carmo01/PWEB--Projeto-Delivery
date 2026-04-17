export class MotoristasController {
    constructor(service, entregasService) {
        this.service = service
        this.entregasService = entregasService

        this.listarTodos = this.listarTodos.bind(this)
        this.buscarPorId = this.buscarPorId.bind(this)
        this.criar = this.criar.bind(this)
        this.listarEntregas = this.listarEntregas.bind(this)
    }

    async listarTodos(req, res, next) {
        try {
            const motoristas = await this.service.listarTodos()
            res.status(200).json(motoristas)
        } catch (err) {
            next(err)
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const motorista = await this.service.buscarPorId(Number(req.params.id))
            res.status(200).json(motorista)
        } catch (err) {
            next(err)
        }
    }

    async criar(req, res, next) {
        try {
            const novoMotorista = await this.service.criar(req.body)
            res.status(201).json(novoMotorista)
        } catch (err) {
            next(err)
        }
    }

    async listarEntregas(req, res, next) {
        try {
            const { status } = req.query
            const motoristaId = Number(req.params.id)
            await this.service.buscarPorId(motoristaId)
            const entregas = await this.entregasService.listarTodos({ status, motoristaId })
            res.status(200).json(entregas)
        } catch (err) {
            next(err)
        }
    }
}
