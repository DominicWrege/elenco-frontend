import { List, Skeleton, Typography } from "antd";
import { type } from "os";
import { useMemo } from "react";
import { Link } from "wouter";
import { API_URL } from "../../env";
import util from "../../functions/util";
import { FeedSmall } from "../../models/feeds";
import Artwork from "../Artwork/Artwork";
import "./FeedSmallList.css";

type Orientation = "horizontal" | "vertical";

interface Properties {
	feeds?: FeedSmall[];
	onlyArtwork?: boolean;
	loading?: boolean;
	skeletonSize?: string;
	orientation?: Orientation;
}

export const FeedSmallList: React.FC<Properties> = ({
	feeds = [],
	onlyArtwork = false,
	loading = true,
	skeletonSize = "11rem",
	orientation = "vertical",
}) => {
	const className = ["FeedSmallList", `FeedSmallList-${orientation}`].join(" ");
	const skeletons = useMemo(
		() =>
			Array(6).fill(
				<Skeleton.Image style={{ width: skeletonSize, height: skeletonSize }} />
			),
		[skeletonSize]
	);

	const listItem = (feed: FeedSmall): JSX.Element => {
		const artwork = (
			<Artwork
				href={`/feed/${feed.title}`}
				src={`${API_URL}/img/${feed.img}`}
				width="100%"
			/>
		);
		if (onlyArtwork) {
			return <List.Item className="FeedSmallList-item">{artwork}</List.Item>;
		}

		return (
			<List.Item className="FeedSmallList-item">
				{artwork}
				<Link href={`/feed/${feed.title}`} onClick={util.scrollTop}>
					<Typography.Title level={4}>{feed.title}</Typography.Title>
				</Link>
				<Link href={`/author/${feed.authorName}`}>
					<small>{feed.authorName}</small>
				</Link>
			</List.Item>
		);
	};

	if (loading) {
		return (
			<div className={className}>
				<List dataSource={skeletons} renderItem={(item) => item} />
			</div>
		);
	}

	return (
		<div className={className}>
			<List
				rowKey={(feed) => feed.id.toString()}
				dataSource={feeds}
				renderItem={listItem}
			/>
		</div>
	);
};

export default FeedSmallList;
