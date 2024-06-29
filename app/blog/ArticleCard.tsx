"use client"
import Article from "@/types/news/Article"
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={article.title}
          className="w-full object-cover h-[140px]"
          src={article.urlToImage}
          />
      </CardBody>
      <CardFooter className="flex-col text-small justify-between">
        <h3>{article.title}</h3>
        <p className="text-default-500">{article.author}</p>
      </CardFooter>
    </Card>
  )
}

export default ArticleCard