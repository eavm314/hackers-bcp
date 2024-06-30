"use server";
import newsClient from "./axiosClient";

import { ArticleResponse } from "@/types/news/ResponseModels";
import { ArticleResponse } from "@/types/news/ResponseModels";

interface GetNewsParams {
  pageSize?: number;
  page?: number;
}

export const getNews = async (
  params: GetNewsParams = {},
): Promise<ArticleResponse> => {
  try {
    const response = await newsClient.get("/top-headlines", {
      params: { category: "business", country: "us", ...params },
    });
    const data = response.data as ArticleResponse;

    return data;
  } catch (error) {
    console.error(error);

    return { status: "error", totalResults: 0, articles: [] };
  }
};
