import { ArticleResponse } from "@/types/news/ResponseModels";
import newsClient from "./axiosClient";
import Article from "@/types/news/Article";

interface GetNewsParams {
  pageSize?: number;
  page?: number;
}

export const getNews = async (params: GetNewsParams = {}): Promise<Article[]> => {
  try {
    const response = await newsClient.get('/top-headlines', { params: { category: 'business',country: 'us', ...params } });
    const data = response.data as ArticleResponse;
    return data.articles;
  } catch (error) {
    console.error(error);
    return [];
  }

}