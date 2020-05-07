FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -D

COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]