import { Card, Empty, Typography } from "antd";
import "./FeedGridList.css";
import React from "react";
import styled from "styled-components";
import { Link } from "wouter";
import { Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { FeedSmall } from "../../models/feeds";
import Artwork, { imgPath } from "../Artwork/Artwork";
import { SortByValue } from "../FeedFilter/FeedFilter";
import MiddleCenter from "../Styles/shared.css";
const { Title } = Typography;

interface Properties {
	feeds: FeedSmall[];
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
		max-height: 8rem;
	}
`;

function renderCard(feed: FeedSmall) {
	return (
		<Card
			key={feed.title}
			cover={
				<Artwork
					src={imgPath(feed.img)}
					width="100%"
					href={`/feed/${feed.title}`}
				/>
			}
		>
			<Link href={`/feed/${feed.title}`}>
				<Title level={4}>{feed.title}</Title>
			</Link>
			<Link href={`/author/${feed.authorName}`}>
				<small>{feed.authorName}</small>
			</Link>
		</Card >
	);
}

export const FeedGridList: React.FC<Properties> = React.memo(({
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
			.sort((a: FeedSmall, b: FeedSmall): number => {
				return sortedBy.compareFn(a, b);
			})
			.map(renderCard);
		return <GridCard>{list}</GridCard>;
	} else {
		return <GridCard>{feeds.map(renderCard)}</GridCard>;
	}
});

export default FeedGridList;
