import type { NextApiRequest, NextApiResponse } from "next";
import { NoteController } from "@/controllers/noteController";

const controller = new NoteController();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    await controller.getAllWeeks(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
