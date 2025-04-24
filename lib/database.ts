import "reflect-metadata";
import { DataSource } from "typeorm";
import { Note } from "../entities/Note";
import { User } from "../entities/User";
import { Week } from "../entities/Week";
import { Debug } from "../entities/Debug";

let appDataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (appDataSource && appDataSource.isInitialized) {
    console.log("Returning existing DataSource");
    return appDataSource;
  }

  // Validate environment variables
  const requiredEnvVars = [
    "DB_HOST",
    "DB_PORT",
    "DB_USER",
    "DB_PASS",
    "DB_NAME",
  ];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  console.log("Initializing new DataSource with entities:", [
    Note.name,
    User.name,
    Week.name,
    Debug.name,
  ]);

  appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Note, User, Week, Debug],
    synchronize: process.env.NODE_ENV !== "production", // Disable in production
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
    extra: {
      max: 10, // Connection pool max size for serverless
      idleTimeoutMillis: 30000, // Close idle connections after 30s
    },
    logging: process.env.NODE_ENV !== "production", // Enable logging in development
  });

  try {
    console.log("Attempting DataSource initialization...");
    await appDataSource.initialize();
    console.log(
      "Database connected successfully, entities:",
      appDataSource.entityMetadatas.map((m) => m.name)
    );
    return appDataSource;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// Optional: Cleanup DataSource on process exit
process.on("SIGTERM", async () => {
  if (appDataSource && appDataSource.isInitialized) {
    await appDataSource.destroy();
    console.log("DataSource destroyed");
  }
});
