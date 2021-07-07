import { List, Skeleton, Typography } from "antd";
import { useMemo } from "react";
import { Link } from "wouter";
import { API_URL } from "../../env";
import { FeedSmall } from "../../models/feeds";
import Artwork from "../Artwork/Artwork";
import "./FeedSmallList.css";

interface Properties {
	feeds?: FeedSmall[];
	onlyArtwork?: boolean;
	noBorder?: boolean;
	loading?: boolean;
	skeletonSize?: string;
}

const className = "FeedSmallList";

export const FeedSmallList: React.FC<Properties> = ({
	feeds = [],
	onlyArtwork = false,
	noBorder,
	loading = true,
	skeletonSize = "11rem",
}) => {
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
			return (
				<List.Item
					className={["FeedSmallList-item", noBorder ? "noBorder" : ""].join(
						" "
					)}
				>
					{artwork}
				</List.Item>
			);
		}

		return (
			<List.Item
				className={["FeedSmallList-item", noBorder ? "noBorder" : ""].join(" ")}
			>
				{artwork}
				<Link
					href={`/feed/${feed.title}`}
					onClick={(e) => {
						if (window.scrollY > 60) {
							document.body.scrollTop = 0;
							document.documentElement.scrollTop = 0;
						}
					}}
				>
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
