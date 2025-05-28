const http = require("http");

const PORT = 3000;

http
  .createServer((req, res) => {
    res.end("Rodando como usuário não-root no Docker!\n");
  })
  .listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
