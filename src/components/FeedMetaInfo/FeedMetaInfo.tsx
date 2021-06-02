import { Card, Divider, Tree } from "antd";
import "./FeedMetaInfo.css";
import { Link } from "wouter";
import { Category, Meta, TopCategory } from "../../models/feeds";
import { languageCode } from "../../functions/util";
import React, { useEffect } from "react";
import { TagFilled } from '@ant-design/icons';
import { DataNode } from "rc-tree/lib/interface";
import { SmileOutlined, MehOutlined, DownOutlined } from '@ant-design/icons';

interface Properties {
    feed: Meta
    className?: string
}

export function FeedMetaInfo({ feed }: Properties) {
    const renderCategories = (categories: TopCategory[]) => {
        const ret = categories.map((category: TopCategory) => {
            if (category.children.length === 0) {
                return (
                    <li key={category.id}>{category.description}</li>
                );
            } else {
                return (
                    <li key={category.id}>{category.description}
                        <ul>
                            {category.children.map((sub: Category) => {
                                return (
                                    <li key={sub.id}>{sub.description}</li>
                                );
                            })}
                        </ul>
                    </li>
                );
            }
        });
        // console.log(ret);
        return <ul>{ret}</ul>;
    };

    useEffect(() => {

    }, [feed]);

    return (
        <Card title="Information" className="FeedMeta-wrapper">
            {/* <Divider orientation="left" plain>

            </Divider> */}
            <div className="FeedMetaInfo-inner" >
                <div className="FeedMetaInfo-svg-text">
                    <img src="/icons/public.svg" />
                    <a target="_blank" href={feed.link_web ?? "fix me"} >
                        Website
                    </a>
                </div>
                <div className="FeedMetaInfo-svg-text">
                    <img src="/icons/rss_feed_black.svg" />
                    <a target="_blank" href={feed.rss_url} >
                        RSS-Feed
                    </a>
                </div>
                <div className="FeedMetaInfo-svg-text">
                    <img src="/icons/language.svg" />
                    <p>{languageCode(feed.language)}</p>
                </div>
                <div className="FeedMetaInfo-categories">
                    {renderCategories(feed.categories)}
                </div>
            </div>
        </Card>
    );
}
export default FeedMetaInfo;