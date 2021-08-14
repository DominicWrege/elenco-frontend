import { Card, Tag, Typography } from "antd";
import React from "react";
import { Link } from "wouter";
import { TagFilled } from "@ant-design/icons";
import "./FeedResultCard.css";
import Artwork from "../Artwork/Artwork";
import { API_URL } from "../../env";
import { FeedEpisodeModel } from "../../models/feeds";
import { Category, TopCategory } from "../../models/category";
import util from "../../functions/util";

interface Props {
	feed: FeedEpisodeModel;
}

const FeedResultCard: React.FC<Props> = ({ feed }) => {
	const renderCategories = (categories: TopCategory[]): JSX.Element | null => {
		if (categories.length === 0) {
			return null;
		}
		const CategoryTags = categories
			.flatMap((category: TopCategory) => {
				return [
					{ id: category.id, description: category.description },
					...category.children,
				];
			})
			.map((category: Category) => (
				<Tag key={category.id} icon={<TagFilled />}>
					{category.description}
				</Tag>
			));

		return <div>{CategoryTags}</div>;
	};

	return (
		<Card
			className="FeedResultCard"
			title={
				<div>
					<Link
						href={`/feed/${feed.title}`}
						className="active"
						onClick={util.scrollTop}
					>
						{feed.title}
					</Link>
					<div className="FeedResultCard-author" onClick={util.scrollTop}>
						<Link href={`/author/${feed.authorName}`}>{feed.authorName}</Link>
					</div>
				</div>
			}
		>
			<div className="FeedResultCard-content">
				<Artwork src={`${API_URL}/img/${feed.imgCache}`} width={"100%"} />
				<div className="FeedResultCard-meta">
					<Typography.Paragraph ellipsis={{ rows: 3, expandable: true }}>
						{util.removeHtml(feed.subtitle)}
					</Typography.Paragraph>

					<Typography.Paragraph
						ellipsis={{ rows: 3, expandable: true }}
						className="FeedResultCard-description"
					>
						{util.removeHtml(feed.description)}
					</Typography.Paragraph>
					{renderCategories(feed.categories)}
				</div>
			</div>
		</Card>
	);
};

export default FeedResultCard;
