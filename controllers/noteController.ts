import { NextApiRequest, NextApiResponse } from "next";
import { getDataSource } from "@/lib/database";
import { Note } from "@/entities/Note";
import { Week } from "@/entities/Week";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";

export class NoteController {
  async index(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ message: "Note creation endpoint" });
    return;
  }

  async store(req: NextApiRequest, res: NextApiResponse) {
    const { title, note } = req.body;

    if (!title || !note) {
      res
        .status(400)
        .json({ success: false, error: "All fields are required." });
      return;
    }

    try {
      const dataSource = await getDataSource();
      const noteRepo = dataSource.getRepository(Note);
      const weekRepo = dataSource.getRepository(Week);

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
      res.status(201).json({ success: true, note: newNote });
      return;
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json({ success: false, error: error });
      return;
    }
  }

  async currentWeek(req: NextApiRequest, res: NextApiResponse) {
    try {
      const dataSource = await getDataSource();
      const weekRepo = dataSource.getRepository(Week);

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
      return;
    } catch (error) {
      console.error("Error in currentWeek:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
      return;
    }
  }

  async getWeekById(req: NextApiRequest, res: NextApiResponse) {
    const id = parseInt(req.query.id as string);

    if (isNaN(id)) {
      res.status(400).json({ success: false, error: "Invalid week ID" });
      return;
    }

    try {
      const dataSource = await getDataSource();
      const weekRepo = dataSource.getRepository(Week);

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
    } catch (error) {
      res.status(500).json({ success: false, error });
      return;
    }
  }

  async getAllWeeks(req: NextApiRequest, res: NextApiResponse) {
    try {
      const dataSource = await getDataSource();
      const weekRepo = dataSource.getRepository(Week);

      const weeks = await weekRepo.find({ order: { start_date: "ASC" } });
      res.status(200).json({ success: true, weeks });
      return;
    } catch (error) {
      res.status(500).json({ success: false, error });
      return;
    }
  }
}
