
import { Card, Empty, Typography } from 'antd';
import React from 'react'
import styled from 'styled-components';
import { Link } from 'wouter';
import { API_URL } from '../../env';
import { UserFeedModel } from '../../models/feeds';
import Artwork from '../Artwork/Artwork';
const { Title } = Typography;

interface Properties {
    feeds: UserFeedModel[]
    sortedBy?: SortByValue
}

const GridCard = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 18rem);
  gap: 1.5em;
  .ant-card-body {
    padding: 0.75em;
    height: 7rem;
  }
`;


export interface SortByValue {
    name: string;
    compareFn: (feedA: UserFeedModel, feedB: UserFeedModel) => number;
}

export const sortBy: SortByType = {
    title: {
        name: "Titel",
        compareFn: (feedA: UserFeedModel, feedB: UserFeedModel): number => {
            return feedA.title.localeCompare(feedB.title);
        },
    },
    author: {
        name: "Author",
        compareFn: (feedA: UserFeedModel, feedB: UserFeedModel): number => {
            return feedA.authorName.localeCompare(feedB.authorName);
        },
    },
};

export interface SortByType {
    title: SortByValue;
    author: SortByValue;
}


export const FeedGridList: React.FC<Properties> = ({ feeds, sortedBy = sortBy.title }) => {

    if (feeds.length === 0) {
        return (<>
            <Empty />
        </>);
    }

    const list = feeds
        .sort((a: UserFeedModel, b: UserFeedModel): number => {
            return sortedBy.compareFn(a, b);
        })
        .map((feed: UserFeedModel) => {
            return (
                <Card
                    style={{ cursor: "pointer" }}
                    key={feed.title}
                    cover={
                        <Link href={`/feed/${feed.title}`}>
                            <Artwork src={`${API_URL}/img/${feed.img}`} width="100%" />
                        </Link>
                    }
                    actions={[]}
                >
                    <Link href={`/feed/${feed.title}`}>
                        <Title level={4}>{feed.title}</Title>
                    </Link>
                    <small>{feed.authorName}</small>
                </Card>
            );
        });

    return <GridCard>{list}</GridCard>;
};



export default FeedGridList


