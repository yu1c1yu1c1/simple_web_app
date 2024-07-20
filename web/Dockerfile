FROM ubuntu:24.04

RUN apt-get update && apt-get upgrade
RUN apt-get install -y nodejs npm
RUN mkdir /app

# COPY ./backend /app/backend
# COPY ./backend /app/frontend
COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 2222

CMD ["node", "app.mjs"]
# CMD ["npm", "start"]