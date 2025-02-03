# Receipt Processor

A simple Node.js + TypeScript application that processes receipts, calculates points, and provides endpoints to retrieve those points by receipt ID.

## Installation

1. **Clone or Download** this repository:
   ```bash
   git clone https://github.com/Vishnuvardhan27/receipt-processor-api
   cd receipt-processor-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Installs both production and development dependencies (TypeScript, Jest, etc.).

3. **Build the Project**:
   ```bash
   npm run build
   ```
   Compiles your TypeScript (`src/`) into JavaScript in `dist/`.

4. **Start Locally**:
   ```bash
   npm start
   ```
   By default, the server listens on **port 3000**.  
   Access it at: [http://localhost:3000](http://localhost:3000)

### Development Mode

```bash
npm run dev
```
Runs the server via `ts-node` (no separate build step). Perfect for local development or quick testing.

## Testing

We use **Jest** for unit and integration tests:

- **Run All Tests**:
  ```bash
  npm test
  ```

- **Coverage**:
  ```bash
  npx jest --coverage
  ```
  Generates a coverage report in the `coverage/` folder, which is ignored by `.gitignore`.

## Docker Setup

1. **Build the Docker Image**:
   ```bash
   docker build -t receipt-processor .
   ```
   - The `-t receipt-processor` names the built image.
   - The `.` means “use this current directory as the build context.”

2. **Run the Docker Container**:
   ```bash
   docker run -p 3000:3000 receipt-processor
   ```
   - Maps container port `3000` to host port `3000`.
   - Access the app at [http://localhost:3000](http://localhost:3000).

## Endpoints

1. **POST** `/receipts/process`  
   - Accepts a JSON receipt, validates it, calculates points, and returns an `id`.  
   - Example response:  
     ```json
     { "id": "some-generated-id" }
     ```

2. **GET** `/receipts/{id}/points`  
   - Returns the points associated with that `id`, or 404 if not found.  
   - Example response:  
     ```json
     { "points": 35 }
     ```

## Project Structure

```
receipt-processor/
├── src
│   ├── app.ts              // Express app setup
│   ├── server.ts           // Main server entry
│   ├── controllers
│   │   └── receipt.controller.ts
│   ├── routes
│   │   ├── receipt.routes.ts
│   │   └── __tests__       // Integration tests
│   │       └── receipt.routes.test.ts
│   ├── services
│   │   ├── receipt.service.ts
│   │   └── __tests__       // Unit tests
│   │       └── receipt.service.test.ts
│   ├── middlewares
│   │   └── validation.middleware.ts
│   ├── validation
│   │   └── receipt.validation.ts
│   └── interfaces
│       └── receipt.interface.ts
├── package.json
├── tsconfig.json
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```