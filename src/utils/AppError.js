export class AppError extends Error {
    constructor(mensagem, status = 500) {
        super(mensagem)
        this.mensagem = mensagem
        this.status = status
    }
}
