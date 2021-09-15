import "./Home.css";
import { Card, Typography } from "antd";
import Statistic from "../../components/Statistic/Statistic";
import api from "../../functions/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { MetaStatistic } from "../../models/api";
import { FeedSmall } from "../../models/feeds";
import FeedSmallList from "../../components/FeedSmallList/FeedSmallList";
import feed from "../../functions/feed";
import { LOGO } from "../../env";

export const Home: React.FC = () => {
	const mountedRef = useRef(true);

	const [meta, setMeta] = useState<MetaStatistic | null>(null);
	const [topFeeds, setTopFeeds] = useState<FeedSmall[]>([]);
	const [recentFeeds, setRecentFeeds] = useState<FeedSmall[]>([]);

	const [loadFeeds, setLoadFeeds] = useState(true);
	const loadMeta = useCallback(async () => {
		try {
			const [topFeedsJson, metaJson, recentFeedJson] = await Promise.all([
				feed.getTop25(),
				api.getMeta(),
				feed.getRecent(),
			]);

			setTopFeeds(topFeedsJson);
			setMeta(metaJson);
			setRecentFeeds(recentFeedJson);
		} catch (err) {
			console.log(err);
		} finally {
			setLoadFeeds(false);
		}
	}, []);

	useEffect(() => {
		loadMeta();
		return () => {
			mountedRef.current = false;
		};
	}, [loadMeta]);

	return (
		<div className="Home">
			<div className="Home-header">
				<img src={LOGO} height={210} alt="logo" />
				<Typography.Title level={4}>
					An independent open source podcast directory
				</Typography.Title>
			</div>
			<section className="Home-meta">
				<Card>
					{meta && (
						<>
							<Statistic
								label="Total Podcasts"
								value={meta.countFeeds}
							></Statistic>
							<Statistic
								label="Total Episodes"
								value={meta.countEpisodes}
							></Statistic>
							<Statistic
								label="Total Hours"
								value={Math.round(meta.episodesDuration / 3600)}
							></Statistic>
							<Statistic
								label="Total Authors"
								value={meta.countAuthors}
							></Statistic>
						</>
					)}
				</Card>
			</section>
			<section>
				<Card title="Top Podcasts">
					<FeedSmallList
						loading={loadFeeds}
						orientation="horizontal"
						feeds={topFeeds}
					></FeedSmallList>
				</Card>
			</section>
			<section>
				<Card title="Most Recent Podcasts">
					<FeedSmallList
						loading={loadFeeds}
						orientation="horizontal"
						feeds={recentFeeds}
					></FeedSmallList>
				</Card>
			</section>
		</div>
	);
};
