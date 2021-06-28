import { Card } from "antd";
import "./FeedMetaInfo.css";
import { Meta } from "../../models/feeds";
import { useEffect } from "react";
import { Category, TopCategory } from "../../models/category";
import util from "../../functions/util";

interface Properties {
  loading?: boolean;
  feed: Meta;
  className?: string;
}

export function FeedMetaInfo({ feed, loading }: Properties) {
  const renderCategories = (categories: TopCategory[]) => {
    const ret = categories.map((category: TopCategory) => {
      if (category.children.length === 0) {
        return <li key={category.id}>{category.description}</li>;
      } else {
        return (
          <li key={category.id}>
            {category.description}
            <ul>
              {category.children.map((sub: Category) => {
                return <li key={sub.id}>{sub.description}</li>;
              })}
            </ul>
          </li>
        );
      }
    });
    // console.log(ret);
    return <ul>{ret}</ul>;
  };

  useEffect(() => {}, [feed]);

  return (
    <Card title="Information" className="FeedMeta-wrapper">
      <div className="FeedMetaInfo-inner">
        <div className="FeedMetaInfo-svg-text">
          <img src="/icons/public.svg" alt="Fee Website Link Icon" />
          <a target="_blank" rel="noreferrer" href={feed.linkWeb ?? "fix me"}>
            Website
          </a>
        </div>
        <div className="FeedMetaInfo-svg-text">
          <img src="/icons/rss_feed_black.svg" alt="Feed Link Icon" />
          <a target="_blank" rel="noreferrer" href={feed.rss_url}>
            RSS-Feed
          </a>
        </div>
        <div className="FeedMetaInfo-svg-text">
          <img src="/icons/language.svg" alt="Language Icon" />
          <p>{util.languageCode(feed.language)}</p>
        </div>
        <div className="FeedMetaInfo-categories">
          {renderCategories(feed.categories)}
        </div>
      </div>
    </Card>
  );
}
export default FeedMetaInfo;
