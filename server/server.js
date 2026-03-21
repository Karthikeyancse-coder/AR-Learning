import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDatabase } from "./database/connect.database.js";

import studentRoutes from "./routes/student.routes.js";
import learnRoutes from "./routes/learn.routes.js";
import geminiRoutes from "./routes/gemini.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/learn", learnRoutes);
app.use("/api/gemini", geminiRoutes);

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/api/predict", (req, res) => {
  const { studytime, failures, absences, G1, G2 } = req.body;
  
  const pythonProcess = spawn('python', [path.join(__dirname, 'predict.py')]);
  
  let dataString = '';
  
  pythonProcess.stdout.on('data', (data) => {
    dataString += data.toString();
  });
  
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
  });
  
  pythonProcess.on('close', (code) => {
    try {
      const result = JSON.parse(dataString);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: 'Failed to parse python output', details: dataString });
    }
  });

  // Send input JSON to python process stdin
  pythonProcess.stdin.write(JSON.stringify({ studytime, failures, absences, G1, G2 }));
  pythonProcess.stdin.end();
});

app.get("/", (req, res) => {
  res.send(`${process.env.APP_NAME}`);
});

// Start Server
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
