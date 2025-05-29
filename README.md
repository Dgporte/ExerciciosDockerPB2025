# Exercícios Docker!

Esta lista de exercícios propõe desafios práticos para aprender e reforçar conceitos essenciais de Docker. Os exercícios abrangem desde a criação de imagens e containers simples até práticas mais avançadas envolvendo Docker Compose, redes, persistência de dados, otimização de imagens e análise de vulnerabilidades.

---

## Índice

- [Exercício 1](#exercício-1)
- [Exercício 2](#exercício-2)
- [Exercício 3](#exercício-3)
- [Exercício 4](#exercício-4)
- [Exercício 5](#exercício-5)
- [Exercício 6](#exercício-6)
- [Exercício 7](#exercício-7)
- [Exercício 8](#exercício-8)
- [Exercício 9](#exercício-9)
- [Exercício 10](#exercício-10)
- [Exercício 11 – Análise de Vulnerabilidades com Trivy](#exercício-11--análise-de-vulnerabilidades-com-trivy)
- [Exercício 12 – Melhoria de Dockerfile: Imagem Segura e Enxuta](#exercício-12--melhoria-de-dockerfile-imagem-segura-e-enxuta)
- [Exercício 13 – Publicando Imagem Python no Docker Hub](#exercício-13--publicando-imagem-python-no-docker-hub)

---

## Exercício 1

### Objetivo

- Criar um arquivo `Dockerfile` que utilize a imagem base `alpine`.
- Fazer com que o container, ao ser executado, imprima a mensagem:  
  **"Olá, Docker!"**
- Construir uma imagem Docker com o nome `meu-echo`.
- Executar um container a partir dessa imagem, exibindo a mensagem.

---

### O que foi criado

### 1. Dockerfile

Arquivo que define a imagem Docker personalizada:

```Dockerfile
FROM alpine:3.21.3
CMD echo "Olá, Docker!"
```

- `FROM alpine:3.21.3`: Usa a imagem base Alpine Linux na versão 3.21.3, que é leve e minimalista.
- `CMD echo "Olá, Docker!"`: Comando executado quando o container inicia, imprimindo a mensagem.

---

### 2. Construção da imagem

Para criar a imagem, execute o comando:

```bash
docker build -t meu-echo .
```

- `build`: cria a imagem a partir do Dockerfile no diretório atual (indicado pelo `.`).
- `-t meu-echo`: nome da imagem criada.

---

### 3. Execução do container

Para criar e executar um container a partir da imagem:

```bash
docker run --name meu-echo meu-echo
```

- `run`: cria e executa o container.
- `--name meu-echo`: nome do container.
- `meu-echo`: nome da imagem usada.

**Saída esperada:**

```
Olá, Docker!
```

---

### 4. Reiniciar o container

Para executar o container novamente, use:

```bash
docker start meu-echo
```

Isso reexecuta o container, imprimindo a mensagem outra vez.

---

### 5. Verificar logs do container

Para ver as mensagens impressas pelo container:

```bash
docker logs meu-echo
```

Os logs acumulam todas as saídas das execuções anteriores do container.

---

## Conceitos importantes

- **Imagem Docker:** modelo contendo o sistema e comandos.
- **Container:** instância em execução da imagem.
- **docker build:** cria a imagem a partir do Dockerfile.
- **docker run:** cria e executa um container.
- **docker start:** inicia um container criado e parado.
- **docker logs:** exibe saída do container.

---

## Observações finais

- Usamos Alpine por ser uma imagem leve e rápida para testes.
- O comando `CMD` define o que o container executa ao iniciar.
- Nomear containers facilita gerenciá-los depois.
- Logs acumulam saídas de todas execuções do container.

---

## Exercício 2

### Objetivo

- Criar um arquivo `Dockerfile` que utilize a imagem base `ubuntu:22.04`.
- Instalar o servidor web **Nginx** dentro do container.
- Copiar um arquivo `index.html` personalizado para o diretório padrão do Nginx.
- Expor a porta 80 para acesso externo.
- Construir uma imagem Docker com o nome `siteteste`.
- Executar um container a partir dessa imagem e acessar o site pelo navegador.

---

### O que foi criado

#### 1. index.html

Arquivo HTML personalizado com visual moderno e responsivo:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Minha Página Profissional</title>
    <style>
      /* ... (código CSS completo, igual ao fornecido acima) ... */
    </style>
  </head>
  <body>
    <header>
      <h1>MeuSite</h1>
      <nav>
        <a href="#">Início</a>
        <a href="#">Sobre</a>
        <a href="#">Contato</a>
      </nav>
    </header>
    <section class="hero">
      <h2>Seja Bem-vindo!</h2>
      <p>
        Esta é uma página moderna hospedada em Linux, com um visual incrível e
        responsivo.
      </p>
      <a href="#" class="button">Saiba Mais</a>
    </section>
  </body>
</html>
```

> **Obs:** O arquivo `index.html` deve estar no mesmo diretório do `Dockerfile`.

---

#### 2. Dockerfile

Arquivo responsável por construir a imagem personalizada com Nginx e o HTML customizado:

```Dockerfile
FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

COPY index.html /var/www/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

- `FROM ubuntu:22.04`: Usa Ubuntu como base.
- `RUN apt-get install -y nginx`: Instala o servidor web Nginx.
- `COPY index.html /var/www/html/index.html`: Copia o arquivo HTML para o local padrão do Nginx.
- `EXPOSE 80`: Indica que o container usará a porta 80.
- `CMD ["nginx", "-g", "daemon off;"]`: Inicia o Nginx em primeiro plano ao rodar o container.

---

#### 3. Construção da imagem

Para criar a imagem Docker:

```bash
docker build -t siteteste .
```

---

#### 4. Execução do container

Para rodar o container e expor a porta 80:

```bash
docker run --name siteteste -p 80:80 -d siteteste
```

- `--name siteteste`: nome do container.
- `-p 80:80`: mapeia a porta 80 do host para a porta 80 do container.
- `-d`: executa em modo "detached" (em segundo plano).

---

#### 5. Acessando o site

Abra o navegador e acesse:  
[http://localhost](http://localhost)

Você verá sua página HTML personalizada servida via Nginx dentro do seu container Docker.

---

### Conceitos importantes

- **Imagem base Ubuntu:** permite instalar pacotes via apt-get, como o Nginx.
- **Nginx:** servidor web popular e leve.
- **docker build/run:** comandos para criar e executar containers.
- **Mapeamento de portas:** necessário para acessar o serviço de dentro do container.

---

### Observações finais

- Sempre que modificar o `index.html`, é necessário reconstruir a imagem com `docker build`.
- Se já existir um container com o nome `siteteste`, remova-o com `docker rm -f siteteste` antes de rodar novamente.
- O comando `EXPOSE` no Dockerfile documenta a porta, mas o mapeamento real é feito com `-p` no `docker run`.

---

## Exercício 3

### Objetivo

- Iniciar um container Ubuntu com terminal interativo
- Navegar pelo sistema de arquivos
- Instalar o pacote `curl` usando `apt`

### Passos realizados

1. **Iniciar um container Ubuntu interativo:**

   ```bash
   docker run -it --name ubuntu-test ubuntu:22.04 bash
   ```

2. **No terminal do container, atualizar pacotes:**

   ```bash
   apt-get update
   ```

3. **Instalar curl:**

   ```bash
   apt-get install -y curl
   ```

4. **Testar:**

   ```bash
   curl https://www.google.com
   ```

   Saída esperada (exemplo do início do HTML):

   ```
   <!doctype html><html itemscope="" itemtype="http://schema.org/WebPage" lang="pt-BR"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"><meta content="/images/branding/googleg/1x/googleg_standard_color_128dp.png" itemprop="image"><title>Google</title>...
   ```

---

## Exercício 4

### Objetivo

- Subir um container MySQL utilizando a imagem `mysql:5.7`
- Utilizar um volume nomeado para armazenar os dados do banco
- Criar bancos de dados no MySQL
- Parar e iniciar novamente o container
- Verificar se os dados persistem após reiniciar

---

## Passo a Passo

### 1. Crie um volume nomeado

Esse volume armazenará os dados do MySQL fora do ciclo de vida do container.

```bash
docker volume create mysql_data
```

---

### 2. Suba o container MySQL com o volume nomeado

```bash
docker run -d \
  --name mysql-container \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=teste \
  -v mysql_data:/var/lib/mysql \
  -p 3306:3306 \
  mysql:5.7
```

- `-v mysql_data:/var/lib/mysql`: Usa o volume nomeado `mysql_data` para persistir os dados.
- `-e MYSQL_DATABASE=teste`: Cria automaticamente o banco de dados chamado `teste`.
- `-e MYSQL_ROOT_PASSWORD=root`: Define a senha do root como `root`.
- `-p 3306:3306`: Expõe a porta padrão do MySQL.

---

### 3. Acesse o MySQL e crie outro banco

Entre no terminal do banco e crie um banco chamado `persistencia`:

```bash
docker exec -it mysql-container mysql -u root -p
# digite 'root' como senha quando solicitado
```

No prompt do MySQL, execute:

```sql
CREATE DATABASE persistencia;
SHOW DATABASES;
EXIT;
```

---

### 4. Pare e inicie o container novamente

```bash
docker stop mysql-container
docker start mysql-container
```

---

### 5. Verifique a persistência dos bancos de dados

Acesse novamente o MySQL:

```bash
docker exec -it mysql-container mysql -u root -p
# digite 'root' como senha
```

E liste os bancos:

```sql
SHOW DATABASES;
```

Você deverá ver, entre outros:

```
information_schema
mysql
performance_schema
persistencia
teste
```

O banco `persistencia` e o banco `teste` permanecem disponíveis, mostrando que os dados foram persistidos com sucesso graças ao volume nomeado.

---

## Observações

- O volume nomeado (`mysql_data`) mantém os dados mesmo que o container seja removido. Só será perdido se o volume for explicitamente removido com `docker volume rm`.
- Para remover tudo: primeiro remova o container, depois o volume.

```bash
docker rm -f mysql-container
docker volume rm mysql_data
```

---

## Dica: Usando docker-compose

Se preferir, pode criar um arquivo `docker-compose.yml` para automatizar o processo:

```yaml
version: "3.8"
services:
  mysql:
    image: mysql:5.7
    container_name: mysql-container
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: teste
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

Para subir:

```bash
docker-compose up -d
```

---

## Conceitos Importantes

- **Volume nomeado:** Armazena dados fora do ciclo de vida do container, garantindo persistência.
- **Persistência:** Dados dos bancos MySQL permanecem mesmo após o container ser parado, iniciado ou removido (desde que o volume não seja excluído).
- **MYSQL_DATABASE:** Permite criar um banco de dados inicial ao subir o container.

---

## Exercício 5 – Variáveis de Ambiente no Container

### Objetivo

- Criar um Dockerfile baseado na imagem Alpine.
- Executar o container passando uma variável de ambiente chamada `MEU_NOME` com seu nome.
- Imprimir o valor da variável utilizando `echo`.

---

### Dockerfile

```Dockerfile
FROM alpine:3.21.3
CMD ["sh", "-c", "echo $MEU_NOME"]
```

### Build e execução

```bash
docker build -t meunome .
docker run -e MEU_NOME=SeuNome meunome
```

Saída esperada:

```
SeuNome
```

---

## Exercício 6

### Objetivo

- Utilizar um **multi-stage build** para otimizar a imagem Docker de uma aplicação Go, deixando a imagem final o menor possível.
- Praticar o conceito de multi-stage utilizando o projeto [GS PING (docker-gs-ping)](https://github.com/docker/docker-gs-ping).

---

### O que foi criado

#### 1. Dockerfile Multi-Stage

Criei um `Dockerfile` utilizando o conceito de multi-stage build. O arquivo está a seguir:

```Dockerfile
FROM golang:1.19 AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY *.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o docker-gs-ping

FROM scratch

WORKDIR /
COPY --from=builder /app/docker-gs-ping /docker-gs-ping

EXPOSE 8080

CMD ["/docker-gs-ping"]
```

---

#### 2. Explicação do Dockerfile

- **Primeira etapa (`builder`):**

  - Utiliza a imagem oficial do Go (versão 1.19) para compilar o binário da aplicação.
  - Copia arquivos de dependência e código-fonte para dentro da imagem.
  - Baixa as dependências com `go mod download`.
  - Compila o binário estático para Linux, armazenando-o como `docker-gs-ping`.

- **Segunda etapa (`scratch`):**
  - Utiliza a imagem `scratch` (completamente vazia) para garantir que a imagem final seja a menor possível.
  - Só copia o binário já compilado da etapa anterior.
  - Expõe a porta `8080` (padrão do GS Ping).
  - Define o comando padrão para executar o binário.

**Dessa forma, a imagem final contém apenas o necessário para rodar a aplicação, sem nenhum arquivo ou biblioteca extra.**

---

#### 3. Construindo e Executando a Imagem

**Para construir a imagem:**

```bash
docker build -t gs-ping-multi .
```

**Para executar o container:**

```bash
docker run -p 8080:8080 gs-ping-multi
```

A aplicação estará acessível na porta 8080.

---

#### 4. Verificação do Resultado

- Após o build, a imagem gerada tem cerca de **12MB**, comprovando que o multi-stage build foi bem utilizado para otimização.
- O container roda apenas o binário da aplicação, tornando-o mais seguro, leve e fácil de distribuir.

---

### Conceitos Praticados

- **Multi-stage build:** Técnica que permite usar várias imagens base em etapas separadas do Dockerfile, otimizando o build e reduzindo o tamanho da imagem final.
- **Imagem scratch:** Usada para criar imagens finais mínimas, sem qualquer sistema operacional ou dependência, contendo apenas o binário necessário.
- **Redução de superfície de ataque:** Menos arquivos e dependências na imagem significam menos riscos de segurança.
- **Melhor desempenho:** Imagens menores são mais rápidas para baixar, enviar e iniciar.

---

### Observações Finais

- O multi-stage build é essencial em aplicações compiladas (como Go) para separar o ambiente de build do ambiente de execução.
- É importante **criar o próprio Dockerfile multi-stage** para demonstrar domínio do conceito, ao invés de apenas copiar exemplos prontos.
- Caso queira rodar testes durante o build, pode adicionar um estágio intermediário para isso, mas o foco do exercício é a otimização da imagem final.

---

## Exercício 7

### Objetivo

- Criar um ambiente completo utilizando **Docker Compose** para uma aplicação **fullstack** composta por React (frontend), Express (backend) e MongoDB (banco de dados).
- Aprender a orquestrar múltiplos containers, configurar redes, persistir dados e realizar a conexão entre os serviços.
- Explorar o conceito de desenvolvimento desacoplado e de ambientes reproduzíveis em qualquer máquina.

---

### O que foi criado

#### 1. Estrutura de Pastas

O projeto foi organizado da seguinte maneira:

```
react-express-mongodb/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   └── ... (código React)
├── backend/
│   ├── Dockerfile
│   └── ... (código Express)
```

#### 2. docker-compose.yml

Arquivo responsável por definir e orquestrar os três serviços: frontend (React), backend (Express) e banco MongoDB.

```yaml
services:
  frontend:
    build:
      context: frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/usr/src/app
      - /usr/src/app/node_modules
    depends_on:
      - backend

  backend:
    build:
      context: backend
    ports:
      - "5001:5000"
    volumes:
      - ./backend:/usr/src/app
      - /usr/src/app/node_modules
    environment:
      - MONGO_URL=mongodb://mongo:27017/meubanco
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

- **frontend:** Serviço React, exposto na porta 3000, com código sincronizado via volume.
- **backend:** Serviço Express, exposto na porta 5001 (aplicação interna roda na 5000), recebe a string de conexão do MongoDB via variável de ambiente.
- **mongo:** Banco de dados MongoDB, armazena dados em volume para garantir persistência.

#### 3. Dockerfile do Frontend

```Dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

#### 4. Dockerfile do Backend

```Dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]
```

---

### Como executar

1. **Entre na pasta do projeto** (onde está o `docker-compose.yml`):

   ```bash
   cd react-express-mongodb
   ```

2. **Suba os serviços:**

   ```bash
   docker compose up --build
   ```

   > Caso a porta 5000 já esteja em uso, altere o mapeamento para outra porta no `docker-compose.yml` (exemplo: `"5001:5000"`).

3. **Acesse as aplicações:**
   - Frontend (React): [http://localhost:3000](http://localhost:3000)
   - Backend (Express): [http://localhost:5001](http://localhost:5001)
   - MongoDB: [localhost:27017](mongodb://localhost:27017) (use um cliente como Compass)

---

### Explicação dos principais conceitos

- **Docker Compose:** Ferramenta para orquestrar múltiplos containers de forma fácil, usando um único arquivo de configuração.
- **Volumes:** Garante que alterações feitas no código do host sejam refletidas no container e que dados importantes (como do banco de dados) sejam persistidos.
- **networks/depends_on:** Permitem controlar a ordem de inicialização e a comunicação entre serviços.
- **Ambiente reproduzível:** Todos os serviços podem ser iniciados em qualquer máquina apenas com Docker instalado, sem necessidade de configurar dependências manualmente.

---

### Observações finais

- Esse exercício mostra na prática como rodar uma stack moderna de desenvolvimento de forma isolada, facilitando o desenvolvimento em equipe e o deploy.
- Caso queira adicionar testes, variáveis de ambiente, ou rodar em produção, é possível estender o arquivo `docker-compose.yml` conforme a necessidade.
- Lembre-se de sempre remover containers e volumes antigos para evitar conflitos de portas e dados desatualizados.

---

## Exercício 8

### Objetivo

- Utilizar o **Docker Compose** para configurar uma aplicação com um banco de dados **PostgreSQL**.
- Integrar a ferramenta **pgAdmin** para gerenciamento visual do banco de dados.

---

### O que foi criado

#### 1. Arquivo `.env`

Para facilitar a configuração e manter as credenciais seguras, utilize um arquivo `.env` no mesmo diretório do `docker-compose.yml`. Exemplo de conteúdo:

```
POSTGRES_USER=yourUser
POSTGRES_PW=changeit
POSTGRES_DB=postgres
PGADMIN_MAIL=your@email.com
PGADMIN_PW=changeit
```

---

#### 2. Arquivo `docker-compose.yml`

O arquivo que orquestra os serviços do PostgreSQL e do pgAdmin, garantindo persistência dos dados através de volumes nomeados e o uso das variáveis de ambiente definidas acima:

```yaml
version: "3.8"

services:
  postgres:
    container_name: postgres
    image: postgres:latest
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PW}
      - POSTGRES_DB=${POSTGRES_DB}
    ports:
      - "5432:5432"
    restart: always
    volumes:
      - postgres_data:/var/lib/postgresql/data

  pgadmin:
    container_name: pgadmin
    image: dpage/pgadmin4:latest
    environment:
      - PGADMIN_DEFAULT_EMAIL=${PGADMIN_MAIL}
      - PGADMIN_DEFAULT_PASSWORD=${PGADMIN_PW}
    ports:
      - "5050:80"
    restart: always
    volumes:
      - pgadmin_data:/var/lib/pgadmin

volumes:
  postgres_data:
  pgadmin_data:
```

---

### Como executar

1. **Certifique-se de ter o arquivo `.env` na mesma pasta do `docker-compose.yml`** com os valores desejados para usuário e senha do banco e do pgAdmin.

2. **Suba os serviços** com o comando:

   ```bash
   docker-compose up -d
   ```

3. **Acesse o pgAdmin** no navegador:

   ```
   http://localhost:5050
   ```

   Use o e-mail e a senha definidos no seu `.env` para fazer login.

4. **Adicione o servidor PostgreSQL no pgAdmin:**
   - Clique em "Add New Server".
   - Em "General", escolha um nome para o servidor.
   - Em "Connection":
     - **Host:** `postgres`
     - **Port:** `5432`
     - **Username:** igual ao `POSTGRES_USER`
     - **Password:** igual ao `POSTGRES_PW`
   - Salve e acesse seu banco de dados!

---

### Testando a conexão com DBeaver

Após subir os containers, utilizei o [DBeaver](https://dbeaver.io/) para testar a conexão com o banco de dados PostgreSQL. Os parâmetros utilizados para a conexão foram:

- **Host:** `localhost` (ou `127.0.0.1`)
- **Porta:** `5432`
- **Database:** o valor de `POSTGRES_DB` definido no `.env`
- **Usuário:** o valor de `POSTGRES_USER` definido no `.env`
- **Senha:** o valor de `POSTGRES_PW` definido no `.env`

A conexão foi realizada com sucesso, confirmando que o banco de dados estava operacional e acessível externamente.

---

### Conceitos Praticados

- **Docker Compose:** Orquestra múltiplos containers de forma simples e reproduzível.
- **Volumes nomeados:** Garantem a persistência dos dados do PostgreSQL e das configurações do pgAdmin mesmo após containers serem removidos.
- **Variáveis de ambiente:** Facilitam a configuração e evitam expor senhas diretamente no arquivo `docker-compose.yml`.
- **Gerenciamento visual:** O pgAdmin oferece uma interface gráfica amigável para administração do banco PostgreSQL.
- **Teste com DBeaver:** Demonstrou que o banco está acessível e funcional por outras ferramentas clientes.

---

### Observações Finais

- **Persistência:** A remoção dos containers não apaga os dados do banco ou as configurações do pgAdmin, pois estão salvos nos volumes.
- **Praticidade:** Com poucos comandos, você tem um ambiente completo para desenvolvimento e testes com PostgreSQL.
- **Segurança:** Nunca exponha suas credenciais reais em repositórios públicos.

---

## Exercício 9

### Objetivo

- Servir uma landing page estática utilizando o Nginx em um container Docker.
- Utilizar a imagem oficial `nginx:alpine` para uma solução leve e produtiva.
- Organizar os arquivos HTML, CSS, JS do site na pasta `pages/` do projeto.
- Garantir que o arquivo principal `index.html` seja exibido diretamente ao acessar a raiz do site.

---

### Estrutura do Projeto

```
exercicio9/
├── Dockerfile
├── pages/
│   ├── index.html
│   └── [outros arquivos e pastas do site]
```

---

### Dockerfile utilizado

```Dockerfile
FROM nginx:alpine
COPY pages/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- `FROM nginx:alpine`: Usa a imagem oficial do Nginx baseada em Alpine Linux (leve e eficiente).
- `COPY pages/ /usr/share/nginx/html/`: Copia todo o conteúdo da pasta `pages/` do projeto para o diretório padrão de arquivos estáticos do Nginx.
- `EXPOSE 80`: Expõe a porta 80 para acesso externo.
- `CMD ["nginx", "-g", "daemon off;"]`: Mantém o Nginx rodando em primeiro plano.

---

### Passos para execução

1. **Monte a imagem Docker:**

   ```bash
   docker build -t material-kit-landing .
   ```

2. **Remova qualquer container antigo com o mesmo nome (caso exista):**

   ```bash
   docker rm -f material-kit
   ```

3. **Rode o novo container:**

   ```bash
   docker run --name material-kit -p 8080:80 -d material-kit-landing
   ```

4. **Acesse a landing page:**
   Abra o navegador e acesse [http://localhost:8080](http://localhost:8080)

---

### Observações Importantes

- O **arquivo principal precisa se chamar `index.html`** e estar dentro da pasta `pages/` para ser servido na raiz do site.
- Se alterar arquivos da pasta `pages/`, **reconstrua a imagem** antes de rodar novamente.
- Para ver os arquivos que foram copiados para o container, use:
  ```bash
  docker exec -it material-kit ls /usr/share/nginx/html
  ```

---

### Créditos

Landing page baseada em [Material Kit by Creative Tim](https://www.creative-tim.com/product/material-kit).

---

## Exercício 10

### Objetivo

- Demonstrar como rodar containers Docker de forma mais segura, evitando o uso do usuário root.
- Criar um Dockerfile para uma aplicação Node.js simples (servidor HTTP) e configurá-lo para rodar com um usuário não-root.
- Construir a imagem, iniciar o container e verificar que o processo está rodando com o novo usuário.

---

### O que foi criado

#### 1. app.js

Pequeno servidor HTTP em Node.js:

```javascript
const http = require("http");

const PORT = 3000;

http
  .createServer((req, res) => {
    res.end("Rodando como usuário não-root no Docker!\n");
  })
  .listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
```

---

#### 2. Dockerfile

Arquivo responsável por criar a imagem Docker com Node.js rodando como usuário não-root:

```Dockerfile
FROM node:20-alpine

RUN adduser -D appuser

WORKDIR /app
COPY app.js .

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 3000

CMD ["node", "app.js"]
```

---

### Passos para execução

1. **Construa a imagem Docker:**

   ```bash
   docker build -t node-nonroot .
   ```

2. **Rode o container:**

   ```bash
   docker run -d --name node-nonroot-demo -p 3000:3000 node-nonroot
   ```

3. **Verifique o usuário dentro do container:**

   ```bash
   docker exec node-nonroot-demo whoami
   ```

   Saída esperada:

   ```
   appuser
   ```

4. **Testar a aplicação:**
   Abra o navegador e acesse [http://localhost:3000](http://localhost:3000)  
   ou use:
   ```bash
   curl http://localhost:3000
   ```
   Saída esperada:
   ```
   Rodando como usuário não-root no Docker!
   ```

---

### Conceitos importantes

- **USER:** A instrução USER no Dockerfile garante que a aplicação não rode como root, aumentando a segurança.
- **adduser:** Utilizado para criar um usuário sem privilégios no Alpine Linux.
- **chown:** Garante que o diretório da aplicação pertença ao novo usuário.
- **EXPOSE:** Documenta a porta usada pela aplicação.
- **Verificação com `whoami`:** Confirma que o processo do container está rodando como o novo usuário.

---

### Observações finais

- É uma boa prática sempre rodar aplicações em containers Docker utilizando usuários não-root para reduzir riscos de segurança.
- O mesmo conceito pode ser aplicado a outros tipos de aplicação (Python, Go, etc.), bastando ajustar o Dockerfile conforme necessário.

---

## Exercício 11 – Análise de Vulnerabilidades com Trivy

### Objetivo

Rodar o Trivy em uma imagem pública Docker (`node:16`) para identificar vulnerabilidades de severidade HIGH ou CRITICAL, anotar os pacotes afetados e sugerir ações corretivas.

---

### Passos executados

#### 1. Instalação do Trivy

```bash
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sudo sh -s -- -b /usr/local/bin
```

#### 2. Análise da imagem

```bash
trivy image node:16 > resultado_trivy.txt
```

---

### Vulnerabilidades encontradas (HIGH e CRITICAL)

| Pacote                | Vulnerabilidade | Severidade | Versão instalada        | Versão corrigida       | Observação/Sugestão                            |
| --------------------- | --------------- | ---------- | ----------------------- | ---------------------- | ---------------------------------------------- |
| git                   | CVE-2024-32002  | CRITICAL   | 1:2.20.1-2+deb10u8      | 1:2.20.1-2+deb10u9     | Atualizar imagem base para corrigir.           |
| krb5-multidev         | CVE-2024-37371  | CRITICAL   | 1.17-3+deb10u5          |                        | Atualizar imagem base para corrigir.           |
| libdb5.3              | CVE-2019-8457   | CRITICAL   | 5.3.28+dfsg1-0.5        |                        | Não corrigido: considerar atualização da base. |
| libexpat1             | CVE-2024-45491  | CRITICAL   | 2.2.6-2+deb10u6         |                        | Atualizar imagem base para corrigir.           |
| libgssapi-krb5-2      | CVE-2024-37371  | CRITICAL   | 1.17-3+deb10u5          |                        | Atualizar imagem base para corrigir.           |
| libpython2.7-minimal  | CVE-2022-48565  | CRITICAL   | 2.7.16-2+deb10u2        | 2.7.16-2+deb10u3       | Atualizar imagem base para corrigir.           |
| python3.7-minimal     | CVE-2022-48565  | CRITICAL   | 3.7.3-2+deb10u5         | 3.7.3-2+deb10u6        | Atualizar imagem base para corrigir.           |
| wget                  | CVE-2024-38428  | CRITICAL   | 1.20.1-1.1              |                        | Fixa futura, acompanhar upstream.              |
| zlib1g                | CVE-2023-45853  | CRITICAL   | 1:1.2.11.dfsg-1+deb10u2 |                        | Não corrigido: considerar atualização da base. |
| curl                  | CVE-2023-27534  | HIGH       | 7.64.0-4+deb10u6        | 7.64.0-4+deb10u9       | Atualizar imagem base para corrigir.           |
| openssl               | CVE-2024-12797  | HIGH       | 1.1.1n-0+deb10u6        |                        | Atualizar imagem base para corrigir.           |
| ncurses-base          | CVE-2021-39537  | HIGH       | 6.1+20181013-2+deb10u3  | 6.1+20181013-2+deb10u5 | Atualizar imagem base para corrigir.           |
| libwebp-dev           | CVE-2023-4863   | HIGH       | 0.6.1-2+deb10u2         | 0.6.1-2+deb10u3        | Atualizar imagem base para corrigir.           |
| ip (package.json)     | CVE-2024-29415  | HIGH       | 2.0.0                   |                        | Atualizar dependência no projeto (npm).        |
| semver (package.json) | CVE-2022-25883  | HIGH       | 7.3.7                   | 7.5.2, 6.3.1, 5.7.2    | Atualizar dependência no projeto (npm).        |
| python2.7             | CVE-2022-48565  | CRITICAL   | 2.7.16-2+deb10u2        | 2.7.16-2+deb10u3       | Atualizar imagem base para corrigir.           |

_(A lista acima é um recorte dos principais exemplos, conforme saída do Trivy. Para o relatório completo, consulte `resultado_trivy.txt`.)_

---

### Ações recomendadas

- **Atualizar a imagem base:**  
  Muitas vulnerabilidades são corrigidas em versões mais recentes da imagem (`node:18`, `node:20`, ou variantes `-bullseye`, `-alpine`).  
  Exemplo:
  ```dockerfile
  FROM node:20
  ```
- **Atualizar dependências do projeto:**  
  No seu `package.json`, atualize bibliotecas como `ip` e `semver` para versões corrigidas:
  ```bash
  npm install ip@latest semver@latest
  ```
- **Reconstruir a imagem:**  
  Sempre faça o rebuild da imagem após atualizar a base e dependências.

- **Evitar imagens obsoletas:**  
  O próprio Trivy alerta que o Debian 10 não recebe mais updates de segurança. Prefira imagens com suporte ativo.

- **Repetir escaneamento periodicamente:**  
  Implemente o Trivy no pipeline de CI/CD para monitoramento contínuo.

---

### Observações

- Algumas vulnerabilidades podem não afetar diretamente seu projeto, mas manter a imagem e dependências atualizadas reduz riscos.
- Consulte detalhes das CVEs em https://cve.mitre.org/ ou https://nvd.nist.gov/.
- Se dependências não forem essenciais, remova-as para reduzir a superfície de ataque.

---

## Exercício 12 – Melhoria de Dockerfile: Imagem Segura e Enxuta

### Objetivo

A partir de um Dockerfile vulnerável e com más práticas, aplicar melhorias para construir uma imagem Docker mais segura, enxuta e adequada para produção.

---

### Dockerfile vulnerável original

```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

#### Problemas identificados

- **Imagem base genérica e grande**: Inclui bibliotecas e ferramentas desnecessárias.
- **Usuário root por padrão**: Aumenta o risco de segurança.
- **Dependências desatualizadas**: `flask==1.1.1` possui vulnerabilidades conhecidas.
- **Build pouco eficiente**: A ordem dos comandos prejudica o aproveitamento do cache do Docker.
- **COPY . .** pode trazer arquivos desnecessários (usar `.dockerignore`).
- **Sem definição de variáveis de ambiente e porta exposta**.

---

### Melhorias aplicadas

- Troca para imagem base menor (`python:3.9-slim`).
- Atualização da dependência Flask para uma versão segura (`flask==2.3.3`).
- Criação de usuário não-root e execução da aplicação sem privilégios elevados.
- Uso de `pip install --no-cache-dir` para evitar arquivos temporários.
- Separação dos comandos de cópia para melhor aproveitamento de cache.
- Adição de variáveis de ambiente relevantes.
- Adição de arquivo `.dockerignore` para evitar copiar arquivos desnecessários.
- Exposição explícita da porta utilizada pelo Flask.

---

### Dockerfile melhorado

```dockerfile
FROM python:3.9-slim

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
    && apt-get install --no-install-recommends -y gcc \
    && adduser --disabled-password --gecos '' appuser \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 5000

ENV FLASK_ENV=production

CMD ["python", "app.py"]
```

---

### requirements.txt atualizado

```
flask==2.3.3
```

---

### .dockerignore recomendado

```
__pycache__
*.pyc
*.pyo
*.pyd
.env
venv
build
dist
*.egg-info
Dockerfile
resultado_trivy.txt
```

---

### Exemplo de app.py

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

---

### Resumo das melhorias

- Imagem menor e com menos dependências vulneráveis.
- Execução da aplicação como usuário não-root.
- Dependência do Flask atualizada para uma versão segura.
- Build da imagem mais eficiente.
- Menos arquivos desnecessários no contexto da imagem.
- Pronta para produção de forma mais segura.

---

## Exercício 13 – Publicando Imagem Python no Docker Hub

### Objetivo

- Criar um `Dockerfile` utilizando a imagem base `python:3.11-slim`.
- Copiar um script Python local (`app.py`) para a imagem.
- Executar o script com `CMD`, imprimindo a data e hora atual.
- Publicar a imagem no Docker Hub, seguindo o padrão `seu-usuario/nome-da-imagem:tag`.

---

### O que foi criado

#### 1. app.py

Script Python que imprime a data e hora atual:

```python
from datetime import datetime

print("Data e hora atual:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
```

---

#### 2. Dockerfile

Arquivo responsável por construir a imagem Docker baseada no Python 3.11-slim e executar o script:

```Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY app.py .

CMD ["python", "app.py"]
```

---

### Passos para construir e publicar a imagem

#### a. Crie uma conta no Docker Hub

Acesse [https://hub.docker.com/](https://hub.docker.com/) e crie sua conta gratuitamente.

---

#### b. Faça login pelo terminal

```bash
docker login
```

Informe seu usuário e senha do Docker Hub quando solicitado.

---

#### c. Build e tag da imagem

1. **Build da imagem local:**

   ```bash
   docker build -t datapython .
   ```

2. **Tag para o Docker Hub (substitua `seu-usuario` pelo seu usuário do Docker Hub):**

   ```bash
   docker tag datapython seu-usuario/datapython:v1
   ```

   Exemplo real:

   ```bash
   docker tag datapython dgporte/datapython:v1
   ```

---

#### d. Push da imagem para o Docker Hub

```bash
docker push seu-usuario/datapython:v1
```

Exemplo real:

```bash
docker push dgporte/datapython:v1
```

Após o push, a imagem estará disponível publicamente no seu repositório do Docker Hub.

---

#### e. Testando a imagem publicada (opcional)

Qualquer usuário pode baixar e executar sua imagem publicada:

```bash
docker pull seu-usuario/datapython:v1
docker run seu-usuario/datapython:v1
```

Saída esperada (exemplo):

```
Data e hora atual: 2025-05-29 16:52:11
```

---

### Resumo dos principais comandos

```bash
# Build local
docker build -t datapython .

# Tag para Docker Hub
docker tag datapython seu-usuario/datapython:v1

# Login no Docker Hub
docker login

# Push para o Docker Hub
docker push seu-usuario/datapython:v1

# Testar a imagem publicada
docker run seu-usuario/datapython:v1
```

---

### Conceitos praticados

- **Imagens base oficiais:** Uso de imagens enxutas do Python.
- **CMD:** Define o comando padrão ao iniciar o container.
- **Tag de versão:** Padronização do nome da imagem para facilitar publicação e versionamento.
- **Publicação:** Compartilhamento de imagens no Docker Hub.
- **Reutilização:** Qualquer pessoa pode baixar e rodar sua imagem.

---

### Observações finais

- Lembre-se de sempre usar o padrão `seu-usuario/nome-da-imagem:tag` para publicar no Docker Hub.
- O push só é possível se você estiver autenticado e usar seu usuário corretamente.
- Certifique-se de não expor arquivos sensíveis ao copiar arquivos para a imagem Docker (use `.dockerignore` se necessário).
- Sua imagem ficará pública por padrão em conta gratuita.

---
