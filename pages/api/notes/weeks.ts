import type { NextApiRequest, NextApiResponse } from "next";
import { NoteController } from "@/controllers/noteController";
import { withCors } from "@/lib/withCors";

const controller = new NoteController();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await controller.getAllWeeks(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
}

export default withCors(handler);
