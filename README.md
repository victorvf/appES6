### AppES6+
Neste exemplo criamos uma aplicação para consumir a API do [github](https://developer.github.com/v3/repos/#list-your-repositories). Onde pesquisamos por um repositório e quando retornado ele é vizualizado na tela, caso seja procurado por outro ele é adicinado a vizualização, não perdendo o resultado anterior.

#### Tecnologias Utilizadas: 
- Docker
- Babel
- Webpack-dev-server

#### Docker
- Dockerfile
```
FROM node:alpine

RUN mkdir /app
WORKDIR /app

RUN yarn init --yes
COPY . /app

EXPOSE 8080
```
- docker-compose.yml
```
version: '3'
services: 
  node-app:
    build: .
    command: yarn dev
    volumes:
      -  ./appJS:/app/
    ports: 
      - "8080:8080"
```
#### Consumir APP
- _git clone https://github.com/victorvf/appES6.git_
- __criar__: "_Dockefile_" e "_docker-compose.yml_"
- __rodar__: "_docker-compose up_"
- __acessar__: localhost:8080