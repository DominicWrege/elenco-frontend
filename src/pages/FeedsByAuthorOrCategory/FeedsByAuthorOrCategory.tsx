import { Typography } from "antd";
import React, { useEffect } from "react";
import { DefaultParams, useRoute } from "wouter";

interface Property {
  name: string;
}

export interface SearchProperties extends DefaultParams {
  query: string;
}

export const FeedsByAuthorOrCategory: React.FC<Property> = ({ name }) => {
  const params = useRoute<SearchProperties>("/category/:query")[1];

  useEffect(() => {}, [params?.query]);

  return (
    <div>
      <Typography.Title level={2}>{name}</Typography.Title>
      <div>{decodeURI(params?.query ?? "")}</div>
    </div>
  );
};

export default FeedsByAuthorOrCategory;
