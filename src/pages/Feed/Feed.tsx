import React, { useContext, useEffect, useState } from "react";
import { DefaultParams, useRoute } from "wouter";
import { getByName } from "../../functions/feed";
import type { FeedModel } from "../../models/feeds";
import { FeedDetail } from "../../components/FeedDetail/FeedDetail";
import { Comment } from "../../components/Comment/Comment";
import { FlexCenter } from "../../components/Styles/shared.css";
import { useCallback } from "react";
import { UserContext } from "../../contexts/UserContext";

interface FeedRouterProperties extends DefaultParams {
  name: string;
}

export function Feed(): React.ReactElement<void> {
  const [feed, setFeed] = useState<FeedModel | null>(null);
  const userContext = useContext(UserContext);

  const params = useRoute<FeedRouterProperties>("/feed/:name")[1];

  const loadFeed = useCallback(async () => {
    try {
      const json_feed = await getByName(params?.name ?? "");
      setFeed(json_feed);
    } catch (err) {
      console.log(err);
    }
  }, [params?.name]);

  useEffect(() => {
    if (params?.name) {
      // const a = new URLSearchParams(window.location.search);
      // console.log(window.location.search);
      // console.log("page", a.get("page"));
      // console.log("name", a.get("name"));
      // setFeed(decodeURI(params.name));
      loadFeed();
    }
  }, [loadFeed]);

  return (
    <FlexCenter className="Feed">
      <FeedDetail
        feed={feed}
        showSubscribeButton={userContext?.user !== null}
      />
      {feed && <Comment feedId={feed.id} />}
    </FlexCenter>
  );
}
