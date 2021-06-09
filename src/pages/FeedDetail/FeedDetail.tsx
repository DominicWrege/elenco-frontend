import "./FeedDetail.css";
import React, { useEffect } from "react"

import type { FeedModel } from "../../models/feeds";
import { Card, Typography } from 'antd';
import Artwork from "../../components/Artwork/Artwork"; import FeedMetaInfo from "../../components/FeedMetaInfo/FeedMetaInfo";
import { Link } from "wouter";
import EpisodeList from "../../components/EpisodeList/EpisodeList";

const { Title, Paragraph } = Typography;



interface Properties {
    feed: FeedModel | null
}

export function FeedDetail({ feed }: Properties): JSX.Element {

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
                        <Artwork src={feed.img} height={270} />
                        <FeedMetaInfo feed={{
                            rss_url: feed.url,
                            language: feed.language,
                            linkWeb: feed.linkWeb,
                            categories: feed.categories
                        }} />
                    </aside>
                    <section className="FeedDetail-body">
                        {/* <Title level={4}>Description</Title> */}
                        <Card title="Description">
                            {renderSubtitle(feed.subtitle)}
                            <Paragraph >
                                {feed.description}
                            </Paragraph>
                        </Card>

                        <div>
                            <EpisodeList episodes={feed.episodes} feedMeta={
                                {
                                    img: feed.img,
                                    title: feed.title,
                                    linkWeb: feed.linkWeb,
                                    description: feed.description
                                }
                            } />
                        </div>
                    </section>

                </section>
            </div>
        );
    };

    return <>{render()}</>;
}