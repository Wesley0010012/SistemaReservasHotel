FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --include=optional

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
