
FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 5000

CMD ["pnpm", "start"]