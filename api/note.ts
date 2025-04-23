import { VercelRequest, VercelResponse } from "@vercel/node";
import { NoteController } from "./controllers/noteController";
import { AppDataSource } from "./data-source";

const controller = new NoteController();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure the datasource is initialized
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const { method, url } = req;

  if (url === "/api/note" && method === "GET") {
    return controller.index(req as any, res as any);
  }

  if (url === "/api/note" && method === "POST") {
    return controller.store(req as any, res as any);
  }

  if (url === "/api/note/week" && method === "GET") {
    return controller.currentWeek(req as any, res as any);
  }

  res.status(404).json({ message: "Not Found" });
}
