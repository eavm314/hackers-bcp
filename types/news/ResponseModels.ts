import Article from "./Article";
import Source from "./Source";

export interface ArticleResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface SourceResponse {
  status: string;
  sources: Source[];
}
