# Nest.js REST API task management with TypeORM

### Run with docker
1. Run `docker-compose up --build` (will be used `.env.prod` config).
2. By default, API will be available on `http://YOUR_IP:3000`.

### Run without docker
1. You need to set up mysql server. (you can change db credentials and address in `.env.dev` file)
2. Run `npm install`.
3. Run `npm run start:dev`. (will be used `.env.dev` config).
4. By default, API will be available on `http://localhost:3000`.

### API docs
1. On `API_ADDRESS/api` will be available Swagger UI.
