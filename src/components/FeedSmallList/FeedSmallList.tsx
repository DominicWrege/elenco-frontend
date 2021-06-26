import { List, Skeleton, Typography } from "antd";
import { useMemo } from "react";
import { Link } from "wouter";
import { API_URL } from "../../env";
import { SmallFeed } from "../../models/feeds";
import Artwork from "../Artwork/Artwork";
import "./FeedSmallList.css";

interface Properties {
  feeds?: SmallFeed[];
  onlyArtwork?: boolean
  noBorder?: boolean,
  loading?: boolean
  sekelationSize?: string
}


const className = "FeedSmallList";

export const FeedSmallList: React.FC<Properties> = (
  {
    feeds = [],
    onlyArtwork = false,
    noBorder,
    loading = true,
    sekelationSize = "11rem"
  }
) => {

  const sekelations = useMemo(() => new Array(6).fill(<Skeleton.Image style={{ width: sekelationSize, height: sekelationSize }} />), [sekelationSize]);

  const listItem = (feed: SmallFeed): JSX.Element => {

    const artwork = <Link href={`/feed/${feed.title}`}>
      <Artwork
        src={`${API_URL}/img/${feed.img}`}
        width="100%"
      />
      <div hidden>link</div>
    </Link>;

    if (onlyArtwork) {
      return (
        <List.Item className={["FeedSmallList-item", noBorder ? "noBorder" : ""].join(" ")}>
          {artwork}
        </List.Item>
      );
    }

    return (
      <List.Item className={["FeedSmallList-item", noBorder ? "noBorder" : ""].join(" ")}>
        {artwork}
        <Link
          href={`/feed/${feed.title}`}
          onClick={(e) => {
            if (window.scrollY > 60) {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }
          }}>

          <>
            <Typography.Title level={4}>
              {feed.title}
            </Typography.Title>

            <small>{feed.authorName}</small>
          </>
        </Link>
      </List.Item>
    );
  };

  if (loading) {
    return (
      <div className={className}>
        <List
          dataSource={sekelations}
          renderItem={item => item}
        />
      </div >
    );
  }

  return (
    <div className={className}>
      <List
        rowKey={(feed) => feed.id.toString()}
        dataSource={feeds}
        renderItem={listItem}
      />
    </div >
  );
};

export default FeedSmallList;
