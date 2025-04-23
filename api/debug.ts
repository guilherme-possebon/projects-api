import { VercelRequest, VercelResponse } from "@vercel/node";
import { AppDataSource } from "./data-source";
import { DebugController } from "./controllers/debugController";

const controller: DebugController = new DebugController();
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure the datasource is initialized
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const { method, url } = req;

  if (url === "/api/debug" && method === "POST") {
    return controller.store(req as any, res as any);
  }

  if (url === "/api/debug" && method === "GET") {
    return controller.store(req as any, res as any);
  }

  res.status(404).json({ message: "Not Found" });
}
