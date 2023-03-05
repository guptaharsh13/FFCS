FROM node:18

WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
COPY ./src ./src

RUN npm i
CMD npm start