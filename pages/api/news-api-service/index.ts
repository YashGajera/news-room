import * as NewsAPI from "newsapi";
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export const newsapi = new NewsAPI(serverRuntimeConfig.newsApiToken);
