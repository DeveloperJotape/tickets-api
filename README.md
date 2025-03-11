# API Documentation

## Autenticação

### Login de Usuário

**Endpoint:** `POST /auth/signin`

**Requisição:**

```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "token": "jwt_token"
}
```

---

## Usuários

### Criar Usuário

**Endpoint:** `POST /users`

**Requisição:**

```json
{
  "name": "João Silva",
  "cpf": "123.456.789-00",
  "email": "joao@example.com",
  "password": "senha123",
  "position": "Gerente",
  "accessName": "ADMIN"
}
```

**Resposta:**

```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@example.com",
  "position": "Gerente",
  "status": "ACTIVE",
  "Access": { "name": "ADMIN" }
}
```

### Listar Todos os Usuários

**Endpoint:** `GET /users`

**Resposta:**

```json
[
  {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@example.com",
    "position": "Gerente",
    "status": "ACTIVE",
    "Access": { "name": "ADMIN" }
  }
]
```

### Buscar Usuário Logado

**Endpoint:** `GET /users/me`

**Resposta:**

```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@example.com",
  "position": "Gerente",
  "status": "ACTIVE",
  "Access": { "name": "ADMIN" }
}
```

### Deletar Todos os Usuários

**Endpoint:** `DELETE /users`

**Resposta:**

```json
{
  "message": "Usuários deletados"
}
```

---

## Tickets

### Criar Ticket

**Endpoint:** `POST /tickets`

**Requisição:**

```json
{
  "title": "Erro no sistema",
  "description": "Sistema não está respondendo",
  "status": "OPEN",
  "priority": "HIGH",
  "assignedToId": "uuid_do_responsavel"
}
```

**Resposta:**

```json
{
  "id": "uuid",
  "title": "Erro no sistema",
  "description": "Sistema não está respondendo",
  "status": "OPEN",
  "priority": "HIGH",
  "CreatedBy": { "name": "João Silva" },
  "AssignedTo": { "name": "Maria Souza" }
}
```

### Listar Todos os Tickets

**Endpoint:** `GET /tickets`

**Resposta:**

```json
[
  {
    "id": "uuid",
    "title": "Erro no sistema",
    "description": "Sistema não está respondendo",
    "status": "OPEN",
    "priority": "HIGH",
    "CreatedBy": { "name": "João Silva" },
    "AssignedTo": { "name": "Maria Souza" }
  }
]
```

### Buscar Tickets de um Usuário

**Endpoint:** `GET /tickets/user/:userId`

**Resposta:**

```json
[
  {
    "id": "uuid",
    "title": "Erro no sistema",
    "description": "Sistema não está respondendo",
    "status": "OPEN",
    "priority": "HIGH",
    "CreatedBy": { "name": "João Silva" },
    "AssignedTo": { "name": "Maria Souza" }
  }
]
```

### Deletar Todos os Tickets

**Endpoint:** `DELETE /tickets`

**Resposta:**

```json
{
  "message": "Tickets deletados"
}
```

---

## Níveis de Acesso

### Criar Nível de Acesso

**Endpoint:** `POST /access`

**Requisição:**

```json
{
  "name": "ADMIN"
}
```

**Resposta:**

```json
{
  "id": "uuid",
  "name": "ADMIN"
}
```

### Listar Todos os Níveis de Acesso

**Endpoint:** `GET /access`

**Resposta:**

```json
[
  {
    "id": "uuid",
    "name": "ADMIN"
  }
]
```

### Deletar Todos os Níveis de Acesso

**Endpoint:** `DELETE /access`

**Resposta:**

```json
{
  "message": "Níveis de acesso deletados"
}
```

---
