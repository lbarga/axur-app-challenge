# Axur App Test

## Branches

The project has two versions available in the following branches:

- `main` and `v2-mongodb`: This branch contains the final version of the test, which is a monorepo that stores data in MongoDB.
- `v1-local-storage`: This version contains only the frontend, and the search history is saved in the browser's local storage.

## Application Setup

This repository contains a monorepo with a frontend and backend application.

**Frontend Application**

The frontend application is built with Next.js and can be accessed at `http://localhost:3000/`.

**Backend Application**

The backend application is built with Node.js and Express and can be accessed at `http://localhost:4000/`. The data is stored in MongoDB.

**Environment Variables**

To facilitate the evaluation of the test, the access keys are provided in the environment variables in .env file.

## How to Run

To run the application, follow the steps below:

1. Install the dependencies:

   ```bash
   yarn
   ```

2. Start the development server:

   ```bash
   yarn start
   ```

3. Run the available test suite for the application:

   ```bash
   yarn test
   ```

4. Create the bundle for publication:

   ```bash
   yarn build
   ```

   A static build has been configured for this project. You can find the static frontend files at the path: `packages/frontend/out`.

Please make sure you have Node.js and Yarn installed on your system before running the commands above.

## Preview:
You can find this images in images folder.
