## ktir development

npm run start:ktir

## remote development

Postgres Server && PGADMIN
?
npm run start:dev
:

1. Install docker daemon on PC

- windows: https://docs.docker.com/desktop/install/windows-install/
- mac: https://docs.docker.com/desktop/install/mac-install/

2. docker-compose up

## Options

- you can map volume --> see docker-compose.yaml
- you can use collections for postman --> see src/db/data

## ARM development

##ssh tunel

- ssh -L 5432:localhost:5432 10.251.33.26
- npm run start:server:development
