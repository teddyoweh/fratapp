
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9990
EXPOSE 8080
RUN npm install -g pm2
CMD ["pm2-runtime", "npm", "--", "start"]