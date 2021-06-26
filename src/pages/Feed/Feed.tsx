import React, { useContext, useEffect, useState } from "react";
import { DefaultParams, useRoute } from "wouter";
import { feed } from "../../functions/feed";
import type { FeedEpisodeModel, SmallFeed } from "../../models/feeds";
import { FeedDetail } from "../../components/FeedDetail/FeedDetail";
import { FlexCenter } from "../../components/Styles/shared.css";
import { useCallback } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./Feed.css";
import FeedSmallList from "../../components/FeedSmallList/FeedSmallList";
import { Card } from "antd";
interface FeedRouterProperties extends DefaultParams {
  name: string;
}

export function Feed(): React.ReactElement<void> {
  const [feedValue, setFeedValue] = useState<FeedEpisodeModel | null>(null);
  const [relatedFeeds, setRelatedFeeds] = useState<SmallFeed[]>([]);
  const userContext = useContext(UserContext);

  const params = useRoute<FeedRouterProperties>("/feed/:name")[1];

  // TODO do loading
  const loadFeed = useCallback(async () => {
    if (params?.name) {
      try {
        const json_feed: FeedEpisodeModel = await feed.getByName(params?.name ?? "");
        setFeedValue(json_feed);
        setRelatedFeeds(await feed.getRelated(json_feed.id));
      } catch (err) {
        console.log(err);
      }
    }
  }, [params?.name]);

  useEffect(() => {
    // const a = new URLSearchParams(window.location.search);
    // console.log(window.location.search);
    // console.log("page", a.get("page"));
    // console.log("name", a.get("name"));
    // setFeed(decodeURI(params.name));
    loadFeed();
  }, [loadFeed]);

  return (
    <FlexCenter className="Feed">
      <FeedDetail
        feed={feedValue}
        showComments
        relatedFeeds={relatedFeeds}
        showSubscribeButton={userContext?.user !== null}
      />
    </FlexCenter>
  );
}
