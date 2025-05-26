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
