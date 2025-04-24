import type { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "@/controllers/userController";

const controller = new UserController();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await controller.show(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
}
