import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const repo = AppDataSource.getRepository(User);

export class UserController {
  async index(req: Request, res: Response) {
    res.json({ message: "User creation endpoint" });
  }

  async store(req: Request, res: Response) {
    const { name, email, password, password_confirmation } = req.body;

    if (!name || !email || !password || !password_confirmation) {
      res
        .status(400)
        .json({ success: false, error: "All fields are required." });
      return;
    }

    if (password !== password_confirmation) {
      res
        .status(400)
        .json({ success: false, error: "Passwords do not match." });
      return;
    }

    try {
      const user = repo.create({
        name,
        email,
        password: await bcryptjs.hash(password, 10),
        remember_token: uuidv4(),
      });

      await repo.save(user);

      res.json({ success: true });
      return;
    } catch (e) {
      console.error(e);
      res.status(500).json({
        success: false,
        error: "There was an error while saving the user.",
      });
      return;
    }
  }

  async listAllUsers(req: Request, res: Response) {
    try {
      const users = await repo.find();
      res.json({ users });
      return;
    } catch (e) {
      res.status(500).json({ error: "Error fetching users" });
      return;
    }
  }

  async verifyUserName(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required." });
      return;
    }

    const user = await repo.findOne({ where: { name } });

    res.json({ exists: !!user });
    return;
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const user = await repo.findOneBy({ id: Number(id) });

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.json({ user });
    return;
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await repo.findOneBy({ id: Number(id) });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await repo.save(user);
    res.json({ success: true });
    return;
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    const result = await repo.delete(id);

    if (result.affected === 0) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.json({ success: true });
    return;
  }
}
