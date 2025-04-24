// lib/database.ts
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

  console.log("Initializing new DataSource with entities:", [
    Note,
    User,
    Week,
    Debug,
  ]);

  appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Note, User, Week, Debug],
    synchronize: false,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });

  try {
    await appDataSource.initialize();
    console.log("Database connected successfully");
    return appDataSource;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
