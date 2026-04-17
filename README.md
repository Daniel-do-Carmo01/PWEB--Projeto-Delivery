# Delivery Tracker — Atividade 06

## Execução

```bash
npm install
node app.js
```

> Requer Node.js 18+ (ES Modules nativos, `"type": "module"` no `package.json`).

---

## Diagrama de Composição de Dependências

```
bootstrap.js  (único ponto de composição)
│
├── Database (instância única compartilhada)
│
├── EntregasRepository(database)
├── MotoristasRepository(database)
│
├── EntregasService(entregasRepo, motoristasRepo)
├── MotoristasService(motoristasRepo)
│
├── EntregasController(entregasService)
└── MotoristasController(motoristasService, entregasService)

app.js
├── /api/entregas  → entregas.routes.js → EntregasController
└── /api/motoristas → motoristas.routes.js → MotoristasController
```

---

## Rotas

### Motoristas

#### Cadastrar motorista
```bash
curl -X POST http://localhost:3000/api/motoristas \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva", "cpf": "123.456.789-00", "placaVeiculo": "ABC-1234"}'
```

#### Listar motoristas
```bash
curl http://localhost:3000/api/motoristas
```

#### Buscar motorista por ID
```bash
curl http://localhost:3000/api/motoristas/1
```

#### Listar entregas de um motorista
```bash
curl http://localhost:3000/api/motoristas/1/entregas
# Com filtro de status:
curl "http://localhost:3000/api/motoristas/1/entregas?status=CRIADA"
```

---

### Entregas

#### Criar entrega
```bash
curl -X POST http://localhost:3000/api/entregas \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Caixa frágil", "origem": "São Paulo", "destino": "Rio de Janeiro"}'
```

#### Listar entregas
```bash
curl http://localhost:3000/api/entregas
# Com filtro de status:
curl "http://localhost:3000/api/entregas?status=CRIADA"
```

#### Buscar entrega por ID
```bash
curl http://localhost:3000/api/entregas/1
```

#### Atribuir motorista a entrega
```bash
curl -X PATCH http://localhost:3000/api/entregas/1/atribuir \
  -H "Content-Type: application/json" \
  -d '{"motoristaId": 1}'
```

#### Avançar status da entrega
```bash
curl -X PATCH http://localhost:3000/api/entregas/1/avanca r
```

#### Cancelar entrega
```bash
curl -X PATCH http://localhost:3000/api/entregas/1/cancelar
```

#### Ver histórico da entrega
```bash
curl http://localhost:3000/api/entregas/1/historico
```

---

## Fluxo de Status das Entregas

```
CRIADA → EM_TRANSITO → ENTREGUE
   ↓           ↓
CANCELADA   CANCELADA
```

---

## Estrutura do Projeto

```
├── app.js                          # Entry point
├── bootstrap.js                    # Composição única de dependências
├── database/
│   └── database.js                 # Banco em memória
├── repositories/
│   ├── entregas.repositories.js    # IEntregasRepository + implementação
│   └── motoristas.repositories.js  # IMotoristasRepository + implementação
├── services/
│   ├── entregas.service.js
│   └── motoristas.service.js
├── controllers/
│   ├── entregas.controller.js
│   └── motoristas.controller.js
├── routes/
│   ├── entregas.routes.js
│   └── motoristas.routes.js
├── middlewares/
│   └── error.middleware.js
└── utils/
    └── AppError.js
```
Daniel do Carmo Nascimento
