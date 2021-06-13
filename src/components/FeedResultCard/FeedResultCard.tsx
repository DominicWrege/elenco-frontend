import { Card, Tag } from "antd";
import React from "react";
import { Link } from 'wouter';
import { TagFilled } from '@ant-design/icons';
import "./FeedResultCard.css";
import Artwork from "../Artwork/Artwork";
import { API_URL } from "../../env";
import { Category, FeedModel, TopCategory } from "../../models/feeds";

interface Props {
    feed: FeedModel
}
const FeedResultCard: React.FC<Props> = (props: Props) => {

    const renderSubtitle = (subtitle?: string): JSX.Element | null => {
        if (!subtitle) {
            return null;
        } else {
            return <p>{subtitle}</p>;
        }
    };
    const renderCategories = (categories: TopCategory[]): JSX.Element | null => {
        if (categories.length === 0) {
            return null;
        }
        const CategoryTags = categories.flatMap((category: TopCategory) => {
            return [{ id: category.id, description: category.description }, ...category.children];

        }).map((category: Category) => <Tag key={category.id} icon={<TagFilled />}>{category.description}</Tag>)

        return <div>{CategoryTags}</div>;
    };

    return (
        <Card
            className="FeedResultCard"
            title={
                <div >
                    <Link href={`/feed/${props.feed.title}`} className="active">
                        {props.feed.title}</Link>
                    <div className="FeedResultCard-author">
                        {props.feed.author}
                    </div>
                </ div>

            }
            extra={<a href="#">Subscribe</a>}
        >

            <div className="FeedResultCard-content">
                <Artwork src={`${API_URL}/img/${props.feed.imgCache}`} width={200} />
                <div className="FeedResultCard-meta">
                    {renderSubtitle(props.feed.subtitle)}
                    <p className="FeedResultCard-description" >{props.feed.description}</p>
                    {renderCategories(props.feed.categories)}
                </div>
            </div>
        </Card>
    )
};


export default FeedResultCard;
