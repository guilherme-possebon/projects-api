import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Note } from "../entities/Note";
import { Week } from "../entities/Week";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const noteRepo = AppDataSource.getRepository(Note);
const weekRepo = AppDataSource.getRepository(Week);

export class NoteController {
  async index(req: Request, res: Response) {
    res.status(200).json({ message: "Note creation endpoint" });
    return;
  }

  async store(req: Request, res: Response) {
    const { title, note } = req.body;

    if (!title || !note) {
      res
        .status(400)
        .json({ success: false, error: "All fields are required." });
      return;
    }

    try {
      const currentDate = new Date();

      let week = await weekRepo.findOne({
        where: {
          start_date: LessThanOrEqual(currentDate),
          end_date: MoreThanOrEqual(currentDate),
        },
      });

      if (!week) {
        const dayOfWeek = currentDate.getDay();
        const daysSinceSunday = dayOfWeek === 0 ? 0 : dayOfWeek;
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - daysSinceSunday);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);

        week = weekRepo.create({
          start_date: startDate,
          end_date: endDate,
        });
        await weekRepo.save(week);
      }

      const newNote = noteRepo.create({
        title,
        note,
        week,
      });

      await noteRepo.save(newNote);

      res.status(200).json({ success: true, note: newNote });
      return;
    } catch (e) {
      res.status(500).json({ success: false, error: e });
      return;
    }
  }

  async currentWeek(req: Request, res: Response) {
    try {
      const week = await weekRepo.findOne({
        where: {
          start_date: LessThanOrEqual(new Date()),
          end_date: MoreThanOrEqual(new Date()),
        },
        relations: ["notes"],
        order: { notes: { created_at: "DESC" } },
      });
      if (!week) {
        res.status(404).json({ success: false, error: "Week not found" });
        return;
      }
      res.status(200).json({ success: true, week });
    } catch (error) {
      console.error("Error in currentWeek:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
  async getWeekById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ success: false, error: "Invalid week ID" });
      return;
    }

    try {
      const week = await weekRepo.findOne({
        where: { id },
        relations: ["notes"],
      });

      if (!week) {
        res.status(404).json({ success: false, error: "Week not found" });
        return;
      }

      res.status(200).json({ success: true, week });
      return;
    } catch (e) {
      res.status(500).json({ success: false, error: e });
      return;
    }
  }

  async getAllWeeks(req: Request, res: Response) {
    try {
      const weeks = await weekRepo.find({ order: { start_date: "ASC" } });
      res.status(200).json({ success: true, weeks });
    } catch (e) {
      res.status(500).json({ success: false, error: e });
    }
  }
}
