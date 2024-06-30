import React from "react";

interface Props {
  text: string;
  size?: number;
}

const Title = ({ text, size }: Props) => {
  const index: number = size && size <= 6 && size >= 1 ? size : 1;
  const textSizes: string[] = [
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
  ];
  const gottenSize: string = textSizes[index - 1];
  const stylesText: string = `m-1 text-center ${gottenSize} font-bold tracking-tight text-gray-900 dark:text-white`;

  return (
    <p className={stylesText} data-testid="title">
      {text}
    </p>
  );
};

export default Title;
