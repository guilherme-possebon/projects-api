// api/user.ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import { UserController } from "./controllers/userController";
import { AppDataSource } from "./data-source";

const controller = new UserController();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure the datasource is initialized
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const { method, url } = req;

  if (url === "/api/user" && method === "POST") {
    return controller.store(req as any, res as any);
  }

  if (url === "/api/user/:id" && method === "GET") {
    return controller.show(req as any, res as any);
  }

  res.status(404).json({ message: "Not Found" });
}
