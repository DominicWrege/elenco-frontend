import "./FeaturedCategory.css";
import { Card } from "antd";
import { useCallback, useEffect, useState } from "react";
import feed from "../../functions/feed";
import { FeedSmall } from "../../models/feeds";
import FeedSmallList from "../FeedSmallList/FeedSmallList";

interface Props {
	name: string;
}

export const FeaturedCategory: React.FC<Props> = ({ name }) => {
	const [feeds, setFeeds] = useState<FeedSmall[]>([]);
	const [loading, setLoading] = useState(true);

	const init = useCallback(async () => {
		try {
			setFeeds(await feed.getByCategory(name));
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	}, [name]);

	useEffect(() => {
		init();
	}, [init]);

	return (
		<Card title={name} className="FeaturedCategory">
			<FeedSmallList
				feeds={feeds}
				onlyArtwork
				orientation="horizontal"
				skeletonSize="7.5rem"
				loading={loading}
			/>
		</Card>
	);
};

export default FeaturedCategory;
