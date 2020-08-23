import { NextApiRequest, NextApiResponse } from "next";
import { newsapi } from "../news-api-service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { search },
  } = req;
  const topHeadlines = await newsapi.v2.topHeadlines({
    q: search,
  });
  res.statusCode = 200;
  res.json({ topHeadlines });
};
