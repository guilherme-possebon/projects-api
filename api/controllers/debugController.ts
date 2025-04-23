import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Debug } from "../entities/Debug";
import { User } from "../entities/User";

const repoDebug = AppDataSource.getRepository(Debug);
const repoUser = AppDataSource.getRepository(User);

export class DebugController {
  async index(req: Request, res: Response): Promise<void> {
    const email = req.query.email as string;
    if (!email) {
      res.status(400).json({
        data: "error",
        message: "Email not provided",
      });
      return;
    }

    const user = await repoUser.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({
        data: "error",
        message: "Invalid email",
      });
      return;
    }

    const debugReports = await repoDebug.find({
      where: { user: { id: user.id } },
      order: { created_at: "DESC" },
      take: 20,
    });

    res.status(200).json({ debugReports });
  }

  async store(req: Request, res: Response): Promise<void> {
    try {
      const { reports, email } = req.body;

      if (!reports || !email) {
        res.status(400).json({ message: "Email and reports are required" });
        return;
      }

      const user = await repoUser.findOne({ where: { email } });
      if (!user) {
        console.error("User not found for email", { email });
        res.status(404).json({ message: "User not found" });
        return;
      }

      for (const report of reports) {
        await repoDebug.save({
          debug_title: report.debug_title,
          debug_content: report.debug_content,
          user: user,
        });
      }

      res.status(201).json({ message: "Debug saved" });
    } catch (error) {
      console.error("Failed to save debug", {
        error: error,
        request: req.body,
      });
      res.status(500).json({ message: "Failed to save debug" });
    }
  }
}
