# Exercícios Docker!

Esta lista de exercícios propõe desafios práticos para aprender e reforçar conceitos essenciais de Docker. Os exercícios abrangem desde a criação de imagens e containers simples até práticas mais avançadas envolvendo Docker Compose, redes, persistência de dados, otimização de imagens e análise de vulnerabilidades.

---

## Exercícios 1

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
