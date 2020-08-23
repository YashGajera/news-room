import { useState, useEffect } from "react";

export type Author = {
  "@type": string;
  name: string;
  url: string;
  jobTitle: string;
};

export type Article = {
  source: {
    id: string;
    name: string;
  };
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
};

export type News = {
  topHeadlines: {
    status: "ok" | "status";
    totalResults: number;
    articles: Array<Article>;
  };
};

const useTopHeadlines = (query?: string) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState<News>();

  useEffect(() => {
    const fetchData = async () => {
      setStatus("fetching");
      const response = await fetch(query ? `/api/news/${query}` : "/api/news");
      const data = await response.json();
      setData(data);
      setStatus("fetched");
    };

    fetchData();
  }, [query]);

  return { status, data };
};

export default useTopHeadlines;
