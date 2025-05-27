# Exercícios Docker!

Esta lista de exercícios propõe desafios práticos para aprender e reforçar conceitos essenciais de Docker. Os exercícios abrangem desde a criação de imagens e containers simples até práticas mais avançadas envolvendo Docker Compose, redes, persistência de dados, otimização de imagens e análise de vulnerabilidades.

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

## Exercício 5

### Objetivo

- Criar um `Dockerfile` baseado na imagem `alpine`
- Definir uma variável de ambiente chamada `MEU_NOME`
- Imprimir o valor da variável utilizando `echo` ao executar o container

---

## 1. Dockerfile

O arquivo `Dockerfile` utilizado:

```Dockerfile
FROM alpine:3.21.3
ENV MEU_NOME=Diogo
CMD ["sh", "-c", "echo $MEU_NOME"]
```

- `FROM alpine:3.21.3`: Usa a imagem Alpine como base.
- `ENV MEU_NOME=Diogo`: Define a variável de ambiente `MEU_NOME` com o valor desejado.
- `CMD ["sh", "-c", "echo $MEU_NOME"]`: Ao iniciar o container, executa o comando que imprime o valor da variável.

---

## 2. Construindo a Imagem

Execute o comando abaixo para construir a imagem com o nome `meunome`:

```bash
docker build -t meunome .
```

Saída esperada (resumida):

```
...
 => => naming to docker.io/library/meunome:latest
...
```

---

## 3. Executando o Container

Para executar o container e imprimir o valor da variável de ambiente:

```bash
docker run meunome
```

Saída esperada:

```
Diogo
```

---

## 4. Explicação Rápida

- **Variáveis de Ambiente (`ENV`)**: São amplamente usadas em containers Docker para parametrizar aplicações e comandos sem alterar o código fonte.
- **CMD com `sh -c`**: Permite que o comando do container interprete variáveis de ambiente e comandos compostos via shell.

---

## 5. Alterando o Valor da Variável (Opcional)

Se desejar passar o valor da variável em tempo de execução (sobrescrevendo o valor do Dockerfile):

```bash
docker run -e MEU_NOME=OutroNome meunome
```

Saída:

```
OutroNome
```

---

## Resumo

Com esses passos, você criou e executou um container Docker que utiliza uma variável de ambiente para exibir um valor personalizado ao ser iniciado. Isso é útil para configurar containers de maneira flexível e padronizada.

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
