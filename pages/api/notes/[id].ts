import { NoteController } from "@/controllers/noteController";
import type { NextApiRequest, NextApiResponse } from "next";

const controller = new NoteController();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    return controller.delete(req, res);
  }

  res.setHeader("Allow", ["DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
