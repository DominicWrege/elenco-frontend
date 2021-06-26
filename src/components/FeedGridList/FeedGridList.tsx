import { Anchor, Card, Divider, Empty, Typography } from "antd";
import "./FeedGridList.css";
import React from "react";
import styled from "styled-components";
import { Link } from "wouter";
import { API_URL } from "../../env";
import { Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { SmallFeed } from "../../models/feeds";
import Artwork from "../Artwork/Artwork";
import { SortByValue } from "../FeedFilter/FeedFilter";
import MiddleCenter from "../Styles/shared.css";
import AnchorLink from "antd/lib/anchor/AnchorLink";
const { Title } = Typography;

interface Properties {
  feeds: SmallFeed[];
  loading: boolean;
  sortedBy?: SortByValue;
}

const GridCard = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 13.5rem);
  gap: 1.5rem;
  .ant-card-body {
    padding: 0.25em 0.75em 0.75em 0.75em;
    height: 6.5rem;
  }
`;

const goToFeed = (event: any): void => {
  event.preventDefault();
  console.log(event.target.parent);
};

function renderCard(feed: SmallFeed) {
  return (
    <Card
      key={feed.title}
      cover={
        <a href={`/feed/${feed.title}`}>
          <Artwork
            src={`${API_URL}/img/${feed["imgCache"] ?? feed.img}`}
            width="100%"
          />
        </a>
      }
    >
      <Link href={`/feed/${feed.title}`}>
        <Title level={4}>{feed.title}</Title>
      </Link>
      <Link href={`/author/${feed.authorName}`}>
        <small>{feed.authorName}</small>
      </Link>
    </Card>
  );
}

export const FeedGridList: React.FC<Properties> = ({
  feeds,
  loading,
  sortedBy,
}) => {
  if (loading) {
    return (
      <MiddleCenter>
        <Spin
          className="FeedGridList-loading"
          tip="loading..."
          indicator={<Loading3QuartersOutlined spin />}
        />
      </MiddleCenter>
    );
  }

  if (feeds.length === 0) {
    return (
      <>
        <Empty description="No Feeds" />
      </>
    );
  }
  if (sortedBy) {
    const list = feeds
      .sort((a: SmallFeed, b: SmallFeed): number => {
        return sortedBy.compareFn(a, b);
      })
      .map(renderCard);
    return <GridCard>{list}</GridCard>;
  } else {
    return <GridCard>{feeds.map(renderCard)}</GridCard>;
  }
};

export default FeedGridList;
