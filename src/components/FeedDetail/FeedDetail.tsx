import "./FeedDetail.css";

import type { FeedEpisodeModel, UserFeedModel } from "../../models/feeds";
import { BackTop, Card, Tabs, Typography } from "antd";
import Artwork from "../Artwork/Artwork";
import FeedMetaInfo from "../FeedMetaInfo/FeedMetaInfo";
import { Link } from "wouter";
import EpisodeList from "../EpisodeList/EpisodeList";
import { SubscribeButton } from "../SubscribeButton/Subscribe";
import { Comment } from "../../components/Comment/Comment";
import React from "react";
import FeedSmallList from "../FeedSmallList/FeedSmallList";

const { Title, Paragraph } = Typography;

interface Properties {
  feed: FeedEpisodeModel | null;
  showSubscribeButton?: boolean;
  showComments?: boolean;
  relatedFeeds?: UserFeedModel[];
}

export const FeedDetail: React.FC<Properties> = ({
  feed,
  showSubscribeButton = false,
  showComments = false,
  relatedFeeds,
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
          <Title level={3}>{feed.title}</Title>
          <Link href={`/author/${feed.authorName}`}>{feed.authorName}</Link>
        </header>
        <section
          className={[
            "FeedDetail-main",
            relatedFeeds
              ? "FeedDetail-main-three-columns"
              : "FeedDetail-main-two-columns",
          ].join(" ")}
        >
          <aside className="FeedDetail-sidebar">
            <Artwork src={feed.img} width={"100%"} />
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
            <Card className="FeedDetail-main-card">
              <Tabs defaultActiveKey="tb1" size="large">
                <Tabs.TabPane tab="Description" key="tbd1">
                  {renderSubtitle(feed.subtitle)}
                  <Paragraph>{feed.description}</Paragraph>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Episodes" key="tbe1">
                  <EpisodeList
                    episodes={feed.episodes}
                    feedMeta={{
                      img: feed.img,
                      title: feed.title,
                      linkWeb: feed.linkWeb,
                      description: feed.description,
                    }}
                  />
                </Tabs.TabPane>
                {showComments && (
                  <Tabs.TabPane tab="Comments" key="tbc">
                    <Comment feedId={feed.id} />
                  </Tabs.TabPane>
                )}
              </Tabs>
            </Card>
          </section>
          {relatedFeeds && (
            <Card title="Related" className="FeedDetail-related">
              <FeedSmallList feeds={relatedFeeds} title="Related" />
            </Card>
          )}
        </section>
        <BackTop />
      </div>
    );
  };

  return <>{render()}</>;
};
