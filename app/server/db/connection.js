// db/connection.js
import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.ATLAS_URI;
if (!URI) {
  console.error("Error: ATLAS_URI is not set in environment variables.");
  process.exit(1); // Stop app if URI is missing
}

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB!");
    db = client.db("isaacdivine37"); // Choose your database
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Stop the app if connection fails
  }
}

// Call immediately to connect on app startup
await connectDB();

// Export the database connection for other files
export default db;

