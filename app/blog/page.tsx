import { title } from "@/components/primitives";
import { getNews } from "@/services/news/methods";
import ArticleCard from "./ArticleCard";

export default async function BlogPage() {
  const news = await getNews({ pageSize: 5 });
  console.log(news);
  return (
    <div>
      <div className="my-2">
        <h1 className={title()}>Blog</h1>
      </div>

      <div className="gap-2 grid grid-cols-1 sm:grid-cols-4 w-full">
        {news.map((article, index) => (
          <ArticleCard key={index} article={article} />
      ))}
      </div>
    </div>
  );
}
