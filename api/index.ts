import express, { Request, Response, NextFunction } from "express";
import serverless from "serverless-http";

const app = express();

app.use(express.json());

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello from the TypeScript API!",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api", (req: Request, res: Response) => {
  const { name } = req.body as { name?: string };
  res.status(200).json({
    message: `Hello, ${name || "Guest"}!`,
  });
});

export const handler = serverless(app);
