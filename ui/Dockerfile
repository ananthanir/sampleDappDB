
FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev"]