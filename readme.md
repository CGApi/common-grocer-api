# Common Grocer API

An API to facilitate a single method of communication between your application and multiple grocery store APIs.

## API Documentation

Coming soon...

## Dev Setup

- Pull down the repo
- run `npm install`
- start a postgres instance on port `5432`, with the username and password set to `postgres`
  - One of these should work:
    - `brew install postgresql`
    - `docker-compose -f docker-compose.ci.yml run db`
- run `npm db:setup` to apply migrations and seed the database
- run `npm run dev` to start the API
- **Recommended**: Install the prisma vscode extension for intellisense and formatting in the schema file
- **Recommended**: Install the eslint vscode extension for in editor lint warnings

## Making DB Schema Changes

- Make sure you have run `npm run db:setup` and have the latest changes applied to your local database
- Make any schema changes and run `npx prisma db push` to sync them to the database
- Once you are done with all changes and ready to open a PR run `npm run db:migrate` to create a new migration
- Commit the generated migration files

## Testing

- Manual Testing
  - Import `Insomnia.json` into your insomnia client (postman alternative) to manually test endpoints.
  - Keep this up to date when API changes are made by exporting from insomnia and overwriting the file.
- Unit Tests
  - Live in the same folder as they code they are testing.
  - Naming convention: `environment.ts` is tested by `environment.test.ts`
- API Tests
  - These tests require the API and DB to be running as they make HTTP requests against the API
  - Live in the `/api-tests` folder
