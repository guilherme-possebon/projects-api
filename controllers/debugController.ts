import { NextApiRequest, NextApiResponse } from "next";
import { getDataSource } from "@/lib/database";
import { Debug } from "@/entities/Debug";
import { User } from "@/entities/User";

type DebugReportPayload = {
  debug_title: string;
  debug_content: string;
};

export class DebugController {
  async index(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const email = req.query.email as string;
    if (!email) {
      res.status(400).json({ message: "Email not provided" });
      return;
    }

    try {
      const dataSource = await getDataSource();
      const repoUser = dataSource.getRepository(User);
      const repoDebug = dataSource.getRepository(Debug);

      const user = await repoUser.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({ message: "Invalid email" });
        return;
      }

      const debugReports = await repoDebug.find({
        where: { user: { id: user.id } },
        order: { created_at: "DESC" },
        take: 20,
      });

      res.status(200).json({ debugReports });
      return;
    } catch (error) {
      console.error("Error retrieving debug reports:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  async store(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { reports, email }: { reports: DebugReportPayload[]; email: string } =
      req.body;

    if (!reports || !email) {
      res.status(400).json({ message: "Email and reports are required" });
      return;
    }

    try {
      const dataSource = await getDataSource();
      const repoUser = dataSource.getRepository(User);
      const repoDebug = dataSource.getRepository(Debug);

      const user = await repoUser.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const debugEntities = reports.map((report) =>
        repoDebug.create({ ...report, user: user as User })
      );

      await repoDebug.save(debugEntities);

      res.status(201).json({ message: "Debug saved" });
      return;
    } catch (error) {
      console.error("Failed to save debug", {
        error,
        request: req.body,
      });
      res.status(500).json({ message: "Failed to save debug" });
      return;
    }
  }
}
