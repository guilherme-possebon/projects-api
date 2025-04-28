import type { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "@/controllers/userController";
import { withCors } from "@/lib/withCors";

const controller = new UserController();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await controller.store(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
}

export default withCors(handler);
