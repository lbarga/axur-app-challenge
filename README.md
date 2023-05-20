# Axur App Test

**Application Setup**

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

<img src="https://raw.githubusercontent.com/lbarga/axur-test-app/v2-mongodb/images/1.png?token=GHSAT0AAAAAACCEZ32URF362GYK3R3RCWU4ZDJKQ5A" alt="Descrição da imagem" width="600px" height="300px" />
<img src="https://raw.githubusercontent.com/lbarga/axur-test-app/v2-mongodb/images/2.png?token=GHSAT0AAAAAACCEZ32UXH276JZAO6YZ6A54ZDJKSXA" alt="Descrição da imagem" width="600px" height="300px" />
<img src="https://raw.githubusercontent.com/lbarga/axur-test-app/v2-mongodb/images/3.png?token=GHSAT0AAAAAACCEZ32UUSPMMEE3HGKXLYEYZDJKS5A" alt="Descrição da imagem" width="600px" height="300px" />
