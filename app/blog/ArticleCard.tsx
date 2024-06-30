"use client"
import Article from "@/types/news/Article"
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link href={article.url} target="_blank">
      <Card shadow="sm" isPressable className="w-full h-full">
        <CardBody className="overflow-hidden p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={article.title}
            className="w-full object-cover h-[140px]"
            src={article.urlToImage}
          />
          <div className="flex-col text-small justify-center text-center p-4">
            <h3 className="mb-2">{article.title}</h3>
            <p className="text-default-500">{article.author}</p>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}

export default ArticleCard