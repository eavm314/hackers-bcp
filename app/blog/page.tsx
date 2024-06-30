import { title } from "@/components/primitives";
import ArticleList from "./ArticleList";

export default async function BlogPage() {
  return (
    <div>
      <div className="my-2">
        <h1 className={title()}>Blog</h1>
      </div>

      <ArticleList />
    </div>
  );
}
