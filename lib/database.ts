import "reflect-metadata";
import { DataSource } from "typeorm";
import { Note } from "../entities/Note";
import { User } from "../entities/User";
import { Week } from "../entities/Week";
import { Debug } from "../entities/Debug";
import { getMetadataArgsStorage } from "typeorm";

let appDataSource: DataSource;

const metadata = getMetadataArgsStorage();
for (const table of metadata.tables) {
  Object.defineProperty(table.target, "name", { value: table.name });
}

export async function getDataSource(): Promise<DataSource> {
  if (appDataSource && appDataSource.isInitialized) {
    console.log("Returning existing DataSource");
    return appDataSource;
  }

  const entities = [
    { name: "Note", entity: Note },
    { name: "User", entity: User },
    { name: "Week", entity: Week },
    { name: "Debug", entity: Debug },
  ];

  console.log(
    "Initializing new DataSource with entities:",
    entities.map((e) => e.name)
  );

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
