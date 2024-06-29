"use client"

import { getNews } from "@/services/news/methods"
import Article from "@/types/news/Article"
import { useEffect, useRef, useState } from "react"
import ArticleCard from "./ArticleCard";
import { useInView } from "framer-motion";
import { Spinner } from "@nextui-org/react";

const newsOffset = 16;

const ArticleList = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(newsOffset);
  const loadRef = useRef(null);
  const inView = useInView(loadRef);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews({ pageSize: newsOffset });
      if (data.status == 'ok') {
        console.log(data);
        setNews(data.articles);
        setTotal(data.totalResults);
      }
    }
    fetchNews();
  }, [])

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView])

  const loadMore = async () => {
    const data = await getNews({ pageSize: newsOffset, page: offset / newsOffset });
    setNews([...news, ...data.articles]);
    setOffset(offset + newsOffset);
  }

  const loading = total === 0 || total > news.length;

  return (
    <div>
      <div className="gap-2 grid grid-cols-1 sm:grid-cols-4 w-full">
        {news.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
      {/* <button onClick={loadMore}>Load More</button> */}
      {
        loading &&
        <div className="my-2" ref={loadRef}>
          <Spinner size="lg" />
        </div>
      }
    </div>
  )
}

export default ArticleList