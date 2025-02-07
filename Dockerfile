FROM node:20

WORKDIR /src

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run" , "dev"]
