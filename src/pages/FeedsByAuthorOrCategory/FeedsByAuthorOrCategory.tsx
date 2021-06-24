import { Typography } from "antd";
import "./FeedsByAuthorOrCategory.css";
import React, { useCallback, useEffect, useState } from "react";
import { DefaultParams, useRoute } from "wouter";
import FeedGridList from "../../components/FeedGridList/FeedGridList";
import feed from "../../functions/feed";
import { UserFeedModel } from "../../models/feeds";
import api from "../../functions/api";

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
  const [feeds, setFeeds] = useState<UserFeedModel[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = useCallback(async () => {
    if (params?.query) {
      try {
        if (config === FeedsBy.Category) {
          const json = await feed.getByCategory(params?.query);
          setFeeds(json as any); // cast to small Feed
        } else {
          const json = await feed.getByAuthor(params?.query);
          setFeeds(json as any);
        }
        console.log(params?.query);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }, [params?.query]);

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
