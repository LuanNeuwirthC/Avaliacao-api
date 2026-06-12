# Projeto Loja — ASP.NET Core + React + JWT

**Credenciais de acesso:** usuário `admin` / senha `123`

---

## Pré-requisitos

- .NET 7 SDK
- Node.js LTS
- MySQL rodando localmente
- `dotnet-ef` instalado globalmente

---

## 1. Configurar banco de dados

No MySQL:
```sql
CREATE DATABASE lojinha;
```

Se precisar ajustar credenciais, edite `LojaApi/appsettings.json`:
```json
"DefaultConnection": "server=localhost;database=lojinha;user=root;password=positivo"
```

---

## 2. Instalar dotnet-ef (se não tiver)

```bash
dotnet tool install --global dotnet-ef
```

Adicione ao PATH se necessário:
```bash
export PATH="$PATH:$HOME/.dotnet/tools"
```

---

## 3. Backend (LojaApi)

```bash
cd LojaApi
dotnet restore
dotnet ef migrations add Inicial
dotnet ef database update
dotnet run
```

API disponível em: `http://localhost:5000/swagger`

---

## 4. Frontend (loja-front)

Em outro terminal:
```bash
cd loja-front
npm install
npm start
```

Frontend disponível em: `http://localhost:3000`

---

## Endpoints da API

### Auth
| Método | Rota              | Corpo                                    |
|--------|-------------------|------------------------------------------|
| POST   | /api/auth/login   | `{"usuario":"admin","senha":"123"}`      |

### Produto (requer JWT)
| Método | Rota                    |
|--------|-------------------------|
| GET    | /api/produto            |
| GET    | /api/produto/{codigo}   |
| POST   | /api/produto            |
| PUT    | /api/produto/{codigo}   |
| DELETE | /api/produto/{codigo}   |

### Cliente (requer JWT)
| Método | Rota                    |
|--------|-------------------------|
| GET    | /api/cliente            |
| POST   | /api/cliente            |
| PUT    | /api/cliente/{codigo}   |
| DELETE | /api/cliente/{codigo}   |

### Fornecedor (requer JWT)
| Método | Rota                          |
|--------|-------------------------------|
| GET    | /api/fornecedor               |
| GET    | /api/fornecedor/nome/{nome}   |
| POST   | /api/fornecedor               |
| PUT    | /api/fornecedor/{codigo}      |
| DELETE | /api/fornecedor/{codigo}      |

### Vendedor (requer JWT)
| Método | Rota                          |
|--------|-------------------------------|
| GET    | /api/vendedor                 |
| GET    | /api/vendedor/salario/{valor} |
| POST   | /api/vendedor                 |
| PUT    | /api/vendedor/{codigo}        |
| DELETE | /api/vendedor/{codigo}        |

---

## Testar JWT no Swagger

1. POST `/api/auth/login` com `{"usuario":"admin","senha":"123"}`
2. Copie o token da resposta
3. Clique em **Authorize** no Swagger
4. Digite: `Bearer SEU_TOKEN`
