import type { NextApiRequest, NextApiResponse } from "next";
import { DebugController } from "@/controllers/debugController";

const controller = new DebugController();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    await controller.index(req, res);
  } else if (req.method === "POST") {
    await controller.store(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
