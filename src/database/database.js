export class Database {
    constructor() {
        this.entregas = []
        this.motoristas = [{"nome": "João Silva", "cpf": "123.456.789-00", "placaVeiculo": "ABC-1234",id:1000, status:"INATIVO"}]
        this.nextEntregaId = 1
        this.nextMotoristasId = 1
    }

    getEntregas() {
        return this.entregas
    }

    getMotoristas() {
        return this.motoristas
    }

    generateEntregaId() {
        return this.nextEntregaId++
    }

    generateMotoristasId() {
        return this.nextMotoristasId++
    }
}
