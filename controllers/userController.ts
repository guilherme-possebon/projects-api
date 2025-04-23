import { NextApiRequest, NextApiResponse } from "next";
import { getDataSource } from "@/lib/database"; // Adjust path
import { User } from "@/entities/User"; // Adjust path
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export class UserController {
  async store(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, password } = req.body;

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

      res.json({ success: true });
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

  async listAllUsers(req: NextApiRequest, res: NextApiResponse) {
    try {
      const dataSource = await getDataSource();
      const repo = dataSource.getRepository(User);

      const users = await repo.find();
      res.json({ users });
      return;
    } catch (error) {
      res.status(500).json({ error: "Error fetching users", message: error });
      return;
    }
  }

  async verifyUserName(req: NextApiRequest, res: NextApiResponse) {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required." });
      return;
    }

    const dataSource = await getDataSource();
    const repo = dataSource.getRepository(User);

    const user = await repo.findOne({ where: { name } });

    res.json({ exists: !!user });
    return;
  }

  async show(req: NextApiRequest, res: NextApiResponse) {
    const id = parseInt(req.query.id as string);

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    const dataSource = await getDataSource();
    const repo = dataSource.getRepository(User);

    const user = await repo.findOneBy({ id });

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.json({ user });
    return;
  }
}
