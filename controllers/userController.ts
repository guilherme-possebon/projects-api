import { NextApiRequest, NextApiResponse } from "next";
import { getDataSource } from "@/lib/database";
import { User } from "@/entities/User";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export class UserController {
  async store(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email and password are required." });
      return;
    }

    try {
      const dataSource = await getDataSource();
      const repo = dataSource.getRepository(User);

      const user = repo.create({
        name,
        email,
        password: await bcryptjs.hash(password, 10),
        remember_token: uuidv4(),
      });

      await repo.save(user);
      res.status(201).json({ success: true });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "There was an error while saving the user.",
      });
      return;
    }
  }

  async listAllUsers(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const dataSource = await getDataSource();
      const repo = dataSource.getRepository(User);

      const users = await repo.find();
      res.status(200).json({ users });
      return;
    } catch (error) {
      res.status(500).json({ error: "Error fetching users", message: error });
      return;
    }
  }

  async verifyUserName(
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required." });
      return;
    }

    try {
      const dataSource = await getDataSource();
      const repo = dataSource.getRepository(User);

      const user = await repo.findOne({ where: { name } });
      res.status(200).json({ exists: !!user });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error verifying username", message: error });
      return;
    }
  }

  async show(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const id = parseInt(req.query.id as string);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    try {
      const dataSource = await getDataSource();
      const repo = dataSource.getRepository(User);

      const user = await repo.findOne({
        where: { id },
        relations: ["debugs"], // Optional: include related debug reports
      });

      if (!user) {
        res.status(404).json({ error: "User not found." });
        return;
      }

      res.status(200).json({ user });
      return;
    } catch (error) {
      res.status(500).json({ error: "Error fetching user", message: error });
      return;
    }
  }
}
