import { Logs } from "@/entities/Log";
import { getDataSource } from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";

type LogPayLoad = {
  log_title: string;
  session: JSON;
  post: JSON;
  server: JSON;
  planograma: JSON;
};

export class LogController {
  async index(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const dataSource = await getDataSource();
      const repoLog = dataSource.getRepository(Logs);

      const logs = await repoLog.find({ take: 20, order: { id: "DESC" } });
      res.status(200).json(logs);
      return;
    } catch (error) {
      console.error("Error retrieving logs:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  async store(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { log_title, session, post, server, planograma }: LogPayLoad =
      req.body;

    try {
      const dataSource = await getDataSource();
      const repoLog = dataSource.getRepository(Logs);
      const logEntity = repoLog.create({
        log_title,
        session,
        post,
        server,
        planograma,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const resnpose = await repoLog.save(logEntity);

      console.log(resnpose);

      res.status(201).json({ message: "Log saved" });
      return;
    } catch (error) {
      console.error("Failed to save Log", {
        error,
        request: req.body,
      });
      res.status(500).json({ message: "Failed to save Log" });
      return;
    }
  }
}
