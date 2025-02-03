# **Receipt Processor API**

A simple **Node.js + TypeScript** application that processes receipts, calculates points, and provides endpoints to retrieve those points by receipt ID.

---

## **Installation**

### **1. Clone or Download**
```bash
git clone https://github.com/Vishnuvardhan27/receipt-processor-api
cd receipt-processor-api
```

### **2. Install Dependencies**
```bash
npm install
```
Installs both production and development dependencies (TypeScript, Jest, etc.).

### **3. Build the Project**
```bash
npm run build
```
Compiles TypeScript (`src/`) into JavaScript in `dist/`.

### **4. Start the Server Locally**
```bash
npm start
```
By default, the server runs on **port 3000**.  
Access it at: [http://localhost:3000](http://localhost:3000)

### **Development Mode**
```bash
npm run dev
```
Runs the server via `ts-node` (no separate build step). Useful for local development.

---

## **Testing**
We use **Jest** for unit and integration tests:

### **Run All Tests**
```bash
npm test
```

### **Run Tests with Coverage**
```bash
npx jest --coverage
```
Generates a coverage report in `coverage/` (ignored by `.gitignore`).

---

## **Docker Setup**

### **1. Build the Docker Image**
```bash
docker build -t receipt-processor .
```
- `-t receipt-processor` names the built image.
- The `.` refers to the current directory as the build context.

### **2. Run the Docker Container**
```bash
docker run -p 3000:3000 receipt-processor
```
- Maps **container port 3000** to **host port 3000**.
- Access the app at **[http://localhost:3000](http://localhost:3000)**.

---

## **API Endpoints & cURL Requests**

### **1. Submit a Receipt**
**Endpoint:** `POST /receipts/process`  
**Description:** Submits a receipt, calculates points, and returns a receipt `id`.  

#### **cURL Request**
```bash
curl -X POST "http://localhost:3000/receipts/process" \
     -H "Content-Type: application/json" \
     -d '{
           "retailer": "Walgreens",
           "purchaseDate": "2022-01-02",
           "purchaseTime": "08:13",
           "total": "2.65",
           "items": [
             {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
             {"shortDescription": "Dasani", "price": "1.40"}
           ]
         }'
```

#### **Example Response**
```json
{
  "id": "adb6b560-0eef-42bc-9d16-df48f30e89b2"
}
```

---

### **2. Get Points for a Receipt**
**Endpoint:** `GET /receipts/{id}/points`  
**Description:** Retrieves the points awarded for a given receipt ID.

#### **cURL Request**
```bash
curl -X GET "http://localhost:3000/receipts/adb6b560-0eef-42bc-9d16-df48f30e89b2/points"
```

#### **Example Response**
```json
{
  "points": 50
}
```

---

## **Project Structure**

```
receipt-processor/
├── src
│   ├── app.ts              # Express app setup
│   ├── server.ts           # Main server entry point
│   ├── controllers
│   │   └── receipt.controller.ts
│   ├── routes
│   │   ├── receipt.routes.ts
│   │   └── __tests__       # Integration tests
│   │       └── receipt.routes.test.ts
│   ├── services
│   │   ├── receipt.service.ts
│   │   └── __tests__       # Unit tests
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