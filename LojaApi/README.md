# LojaApi — ASP.NET Core + Entity Framework + MySQL

## Pré-requisitos
- .NET 8 SDK
- MySQL rodando localmente
- dotnet-ef instalado globalmente

## Configuração do banco

Execute no MySQL:
```sql
CREATE DATABASE loja;
```

Se sua senha do MySQL for diferente de `123456`, edite o arquivo `appsettings.json`:
```json
"DefaultConnection": "server=localhost;database=loja;user=root;password=SUA_SENHA"
```

## Instalar dotnet-ef (se não tiver)
```bash
dotnet tool install --global dotnet-ef
```

## Rodar o projeto

```bash
# 1. Restaurar pacotes
dotnet restore

# 2. Criar a migration
dotnet ef migrations add Inicial

# 3. Atualizar o banco (cria as tabelas)
dotnet ef database update

# 4. Executar a API
dotnet run
```

## Acessar o Swagger

Abra no navegador:
```
http://localhost:5000/swagger
```
ou
```
http://localhost:5001/swagger
```

## Endpoints disponíveis

### Produto
- GET    /api/produto
- POST   /api/produto
- PUT    /api/produto/{codigo}
- DELETE /api/produto/{codigo}

### Cliente
- GET    /api/cliente
- POST   /api/cliente
- PUT    /api/cliente/{codigo}
- DELETE /api/cliente/{codigo}

### Fornecedor
- GET    /api/fornecedor
- POST   /api/fornecedor
- GET    /api/fornecedor/nome/{nome}     ← busca por nome (contém)
- PUT    /api/fornecedor/{codigo}
- DELETE /api/fornecedor/{codigo}

### Vendedor
- GET    /api/vendedor
- POST   /api/vendedor
- GET    /api/vendedor/salario/{valor}   ← busca salário > valor
- PUT    /api/vendedor/{codigo}
- DELETE /api/vendedor/{codigo}

## Verificar tabelas no MySQL

```sql
USE loja;
SHOW TABLES;

SELECT * FROM Produtos;
SELECT * FROM Clientes;
SELECT * FROM Fornecedores;
SELECT * FROM Vendedores;
```
