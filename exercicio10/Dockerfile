FROM node:20-alpine

RUN adduser -D appuser

WORKDIR /app
COPY app.js .

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 3000

CMD ["node", "app.js"]