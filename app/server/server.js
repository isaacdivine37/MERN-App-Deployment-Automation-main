// server.js
import express from "express";
import cors from "cors";
import db from "./db/connection.js"; // MongoDB connection
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// Simple health check route
app.get("/", (req, res) => {
  res.status(200).send("Server is running :)");
});

// Wait for DB connection before starting the server
async function startServer() {
  try {
    // Check if DB is connected
    if (!db) {
      throw new Error("Database not connected");
    }

    app.listen(PORT, () => {
      console.log(`✅ Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // Stop the app if DB connection fails
  }
}

await startServer();
