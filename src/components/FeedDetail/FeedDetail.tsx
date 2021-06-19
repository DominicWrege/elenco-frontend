import "./FeedDetail.css";

import type { FeedModel } from "../../models/feeds";
import { Card, Typography } from "antd";
import Artwork from "../Artwork/Artwork";
import FeedMetaInfo from "../FeedMetaInfo/FeedMetaInfo";
import { Link } from "wouter";
import EpisodeList from "../EpisodeList/EpisodeList";
import { SubscribeButton } from "../Subscribe/Subscribe";
import { Comment } from "../../components/Comment/Comment";
import React from "react";

const { Title, Paragraph } = Typography;

interface Properties {
  feed: FeedModel | null;
  showSubscribeButton?: boolean;
  showComments?: boolean
}

export const FeedDetail: React.FC<Properties> = ({
  feed,
  showSubscribeButton = false,
  showComments = false
}) => {
  const renderSubtitle = (subtitle?: string) => {
    if (!subtitle) {
      return null;
    }
    return <Paragraph>{subtitle}</Paragraph>;
  };

  const render = () => {
    if (!feed) {
      return null;
    }
    return (
      <div className="FeedDetail">
        <header className="FeedDetail-header">
          <Title level={2}>{feed.title}</Title>
          <Link href="/" className="active">
            {feed.author}
          </Link>
        </header>
        <section className="FeedDetail-main">
          <aside className="FeedDetail-sidebar">
            <Artwork src={feed.img} width={270} />
            {showSubscribeButton && <SubscribeButton feedId={feed.id} />}
            <FeedMetaInfo
              feed={{
                rss_url: feed.url,
                language: feed.language,
                linkWeb: feed.linkWeb,
                categories: feed.categories,
              }}
            />
          </aside>
          <section className="FeedDetail-body">
            {/* <Title level={4}>Description</Title> */}
            <Card title="Description">
              {renderSubtitle(feed.subtitle)}
              <Paragraph>{feed.description}</Paragraph>
            </Card>

            <div>
              <EpisodeList
                episodes={feed.episodes}
                feedMeta={{
                  img: feed.img,
                  title: feed.title,
                  linkWeb: feed.linkWeb,
                  description: feed.description,
                }}
              />
            </div>
            {(feed && showComments) && <Comment feedId={feed.id} />}
          </section>
        </section>
      </div>
    );
  };

  return <>{render()}</>;
};
