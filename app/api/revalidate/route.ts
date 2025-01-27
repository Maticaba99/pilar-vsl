import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/"); // Revalida la página Home
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: "Revalidation error" });
  }
}
