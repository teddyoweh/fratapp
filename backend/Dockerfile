
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9990
EXPOSE 8080
CMD [ "npm", "start" ]
