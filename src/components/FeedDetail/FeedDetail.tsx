import "./FeedDetail.css";

import type { FeedEpisodeModel, SmallFeed } from "../../models/feeds";
import { BackTop, Card, Skeleton, Tabs, Typography } from "antd";
import Artwork from "../Artwork/Artwork";
import FeedMetaInfo from "../FeedMetaInfo/FeedMetaInfo";
import { Link } from "wouter";
import EpisodeList from "../EpisodeList/EpisodeList";
import { SubscribeButton } from "../SubscribeButton/Subscribe";
import { Comment } from "../../components/Comment/Comment";
import React from "react";
import FeedSmallList from "../FeedSmallList/FeedSmallList";
import { API_URL } from "../../env";
import { stripHtml } from "string-strip-html";

const { Title, Paragraph } = Typography;

interface Properties {
  feed: FeedEpisodeModel | null;
  showSubscribeButton?: boolean;
  showComments?: boolean;
  relatedFeeds?: SmallFeed[];
  loadingFeed?: boolean;
  loadingRelated?: boolean;
}

export const FeedDetail: React.FC<Properties> = ({
  feed,
  showSubscribeButton = false,
  showComments = false,
  relatedFeeds,
  loadingFeed = true,
  loadingRelated = true,
}) => {
  const renderSubtitle = (subtitle?: string) => {
    if (!subtitle) {
      return null;
    }
    return <Paragraph>{subtitle}</Paragraph>;
  };

  const render = () => {
    return (
      <div className="FeedDetail">
        <header className="FeedDetail-header">
          <Skeleton
            loading={loadingFeed}
            title
            paragraph={{ rows: 1, width: "20rem" }}
          >
            {feed && (
              <>
                <Title level={3}>{feed.title}</Title>
                <Link href={`/author/${feed.authorName}`}>
                  {feed.authorName}
                </Link>
              </>
            )}
          </Skeleton>
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
            {!feed && (
              <Skeleton.Image
                style={{ width: "100%", background: "#fff", height: "14rem" }}
              />
            )}
            {feed && (
              <>
                <Artwork src={feed.img ?? `${API_URL}/img/${feed.imgCache}`} />
                {showSubscribeButton && <SubscribeButton feedId={feed.id} />}
              </>
            )}
            {!feed && (
              <Card>
                <Skeleton loading={loadingFeed}></Skeleton>
              </Card>
            )}
            {feed && (
              <FeedMetaInfo
                feed={{
                  rss_url: feed.url,
                  language: feed.language,
                  linkWeb: feed.linkWeb,
                  categories: feed.categories,
                }}
              />
            )}
          </aside>
          <section className="FeedDetail-body">
            <Card className="FeedDetail-main-card">
              <Skeleton loading={loadingFeed} paragraph={{ rows: 8 }}>
                {feed && (
                  <>
                    <Tabs defaultActiveKey="tb1" size="large">
                      <Tabs.TabPane tab="Description" key="tbd1">
                        {renderSubtitle(feed.subtitle)}
                        <Paragraph>
                          {stripHtml(feed.description ?? "").result}
                        </Paragraph>
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
                  </>
                )}
              </Skeleton>
            </Card>
          </section>
          {relatedFeeds && (
            <Card title="Related" className="FeedDetail-related">
              <FeedSmallList feeds={relatedFeeds} loading={loadingRelated} />
            </Card>
          )}
        </section>
        <BackTop />
      </div>
    );
  };

  return <>{render()}</>;
};
