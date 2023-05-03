FROM node:lts-alpine3.17
WORKDIR /server
COPY package*.json .
RUN npm ci
COPY listings.json .
COPY server.js .
EXPOSE 3000
CMD ["npm", "start"]