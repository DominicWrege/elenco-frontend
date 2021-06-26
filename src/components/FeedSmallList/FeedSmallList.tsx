import { List, Typography } from "antd";
import { Link } from "wouter";
import { API_URL } from "../../env";
import { SmallFeed } from "../../models/feeds";
import Artwork from "../Artwork/Artwork";
import "./FeedSmallList.css";
import { BackTop } from "antd";

interface Properties {
  feeds?: SmallFeed[];
  title: string;
}

export const FeedSmallList: React.FC<Properties> = ({ feeds = [], title }) => {
  const listItem = (feed: SmallFeed): JSX.Element => {
    return (
      <List.Item className="FeedSmallList-item">
        <Link href={`/feed/${feed.title}`}>
          <Artwork
            src={`${API_URL}/img/${feed["imgCache"] ?? feed.img}`}
            width="100%"
          />
        </Link>
        <Link
          href={`/feed/${feed.title}`}
          onClick={(e) => {
            if (window.scrollY > 60) {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }
          }}
        >
          <Typography.Title style={{ cursor: "pointer" }} level={4}>
            {feed.title}
          </Typography.Title>
        </Link>
        <small>{feed.authorName}</small>
      </List.Item>
    );
  };

  return (
    <div className="FeedSmallList">
      <List
        rowKey={(feed) => feed.id.toString()}
        dataSource={feeds}
        renderItem={listItem}
      />
    </div>
  );
};

export default FeedSmallList;
