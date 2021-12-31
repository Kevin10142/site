From node:16-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm prune

CMD ["npm", "start"]
