FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build 

RUN npm install serve -g

CMD ["serve","-s","-p","8000","dist"]

