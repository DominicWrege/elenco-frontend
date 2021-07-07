import { Typography } from "antd";
import "./FeedsByAuthorOrCategory.css";
import React, { useCallback, useEffect, useState } from "react";
import { DefaultParams, useRoute } from "wouter";
import FeedGridList from "../../components/FeedGridList/FeedGridList";
import feed from "../../functions/feed";
import { FeedSmall } from "../../models/feeds";

export enum FeedsBy {
  Author = 0,
  Category,
}

interface Property {
  config: FeedsBy;
}

export interface SearchProperties extends DefaultParams {
  query: string;
}

export const FeedsByAuthorOrCategory: React.FC<Property> = ({ config }) => {
  const pathName = config === FeedsBy.Category ? "category" : "author";
  const params = useRoute<SearchProperties>(`/${pathName}/:query`)[1];
  const [feeds, setFeeds] = useState<FeedSmall[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (params?.query) {
      try {
        const json = config === FeedsBy.Category ? await feed.getByCategory(params?.query) : await feed.getByAuthor(params?.query);
        setFeeds(json);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }, [params?.query, config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="FeedsByAuthorOrCategory">
      <header>
        <Typography.Title level={2}>
          {decodeURI(params?.query ?? "")} ({feeds.length})
        </Typography.Title>
      </header>
      <FeedGridList feeds={feeds} loading={loading}></FeedGridList>
    </div>
  );
};

export default FeedsByAuthorOrCategory;
