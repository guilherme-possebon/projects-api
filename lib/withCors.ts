import Cors from "cors";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

// Initialize the CORS middleware
const cors = Cors({
  origin: "*", // Replace with specific origin in production
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// Properly typed middleware function
type MiddlewareFn = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (result?: unknown) => void
) => void;

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MiddlewareFn
) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve();
    });
  });
}

// Wrapper for API handlers
export function withCors(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    await runMiddleware(req, res, cors);

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    return handler(req, res);
  };
}
