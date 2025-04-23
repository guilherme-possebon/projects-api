import "dotenv/config";
import express from "express";
import { AppDataSource } from "./data-source";
import noteRouter from "./routes/note.routes";

async function bootstrap() {
  await AppDataSource.initialize();

  const app = express();
  app.use(express.json());

  app.use("/note", noteRouter);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
}

bootstrap().catch(console.error);
