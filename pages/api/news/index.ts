import { NextApiResponse } from "next";
import { newsapi } from "../news-api-service";

export default async (_, res: NextApiResponse) => {
  const topHeadlines = await newsapi.v2.topHeadlines();
  res.statusCode = 200;
  res.json({ topHeadlines });
};
