import "./Home.css";
import { Card, Typography } from "antd";
import Statistic from "../Statistic/Statistic";
import { Link } from "wouter";
import api from "../../functions/api";
import { useCallback, useEffect, useState } from "react";
import { MetaStatistic } from "../../models/api";
import { FeedSmall } from "../../models/feeds";
import FeedSmallList from "../FeedSmallList/FeedSmallList";
import feed from "../../functions/feed";
const { Text } = Typography;

export const Home: React.FC = () => {
	const [meta, setMeta] = useState<MetaStatistic | null>(null);
	const [topFeeds, setTopFeeds] = useState<FeedSmall[]>([]);
	const [recentFeeds, setRecentFeeds] = useState<FeedSmall[]>([]);

	const [loadFeeds, setLoadFeeds] = useState(true);
	const loadMeta = useCallback(async () => {
		try {
			// const json: MetaStatistic = await api.getMeta();
			// setMeta(json);
			// const feeds = await feed.getTop25();
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
	}, [loadMeta]);

	return (
		<div className="Home">
			<header>
				<Typography.Title level={1}>Welcome to Elenco!</Typography.Title>
				<Typography.Title level={2}>
					An independent open source podcast directory.
				</Typography.Title>
			</header>
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
			<section>
				<Card title="FAQ">
					<Text strong>What is Elenco?</Text>
					<p>
						Elenco is an open source independent Podcast Index where you can
						find or discover your favorite podcast.
					</p>
					<Text strong>How can I use it?</Text>
					<p>
						You can listen, discover new Podcasts and read comments from other
						users.
					</p>
					<Text strong>For which purpose do I need an account?</Text>
					<p>
						Only if you want to subscribe or provide feedback to your favorite
						Podcasts, you need to
						<Link href="/register"> sign up</Link> for an account.
					</p>

					<Text strong>How much costs Elenco?</Text>
					<p>Elenco is totally free.</p>

					<Text strong>Where can I contribute?</Text>
					<p>
						You can find it on <a href="https://github.com">Github.com</a>.
					</p>
				</Card>
			</section>
		</div>
	);
};
