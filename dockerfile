# Stage 1 - Build Frontend #
FROM node:20-alpine AS Frontend

COPY ./frontend /app

WORKDIR /app

RUN npm install

RUN npm run build

# Stage 2 - Build Backend #
FROM node:20-alpine 

COPY ./backend /app

WORKDIR /app

RUN npm install

COPY --from=Frontend /app/dist app/public

CMD [ "node","src/server.js" ]




