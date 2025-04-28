import type { NextApiRequest, NextApiResponse } from "next";
import { NoteController } from "@/controllers/noteController";
import { withCors } from "@/lib/withCors";

const controller = new NoteController();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await controller.index(req, res);
  } else if (req.method === "POST") {
    await controller.store(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
}
export default withCors(handler);
