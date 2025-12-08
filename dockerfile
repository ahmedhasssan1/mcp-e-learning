from node:24

WORKDIR /app

COPY packahe.json .
COPY packahe-lock.json .

RUN npm install

COPY . .