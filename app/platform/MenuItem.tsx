"use client"
import { Icon } from "@iconify/react";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";

const MenuItem = ({ item }: any) => {
  return (
    <Tooltip content={item.path} placement="right-end">
      <Link href={`/platform/${item.path.toLocaleLowerCase()}`}>
        <Icon icon={item.icon} className="w-full h-auto cursor-pointer text-default-foreground" />
      </Link>
    </Tooltip>
  )
}

export default MenuItem