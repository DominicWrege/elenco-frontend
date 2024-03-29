import React, { useContext, useEffect, useRef, useState } from "react";
import { DefaultParams, useLocation, useRoute } from "wouter";
import { feed } from "../../functions/feed";
import type { FeedEpisodeModel, FeedSmall } from "../../models/feeds";
import { FeedDetail } from "../../components/FeedDetail/FeedDetail";
import { FlexCenter } from "../../components/Styles/shared.css";
import { useCallback } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./Feed.css";

interface FeedRouterProperties extends DefaultParams {
	name: string;
}

export function Feed(): React.ReactElement<void> {
	const mountedRef = useRef(true);
	const [feedValue, setFeedValue] = useState<FeedEpisodeModel | null>(null);
	const [relatedFeeds, setRelatedFeeds] = useState<FeedSmall[]>([]);
	const userContext = useContext(UserContext);

	const [loadingRelated, setLoadingRelated] = useState(true);
	const [loadingFeed, setLoadingFeed] = useState(true);

	const setLocation = useLocation()[1];

	const params = useRoute<FeedRouterProperties>("/feed/:name")[1];
	const loadFeed = useCallback(async () => {
		if (params?.name) {
			try {
				const json_feed: FeedEpisodeModel = await feed.getByName(params?.name);
				setFeedValue(json_feed);
				setRelatedFeeds(await feed.getRelated(json_feed.id));
			} catch (err: any) {
				console.error(err);
				if (err?.response?.status === 404) {
					setLocation("/404");
				}
			} finally {
				setLoadingFeed(false);
				setLoadingRelated(false);
			}
		}
	}, [params?.name, setLocation]);

	useEffect(() => {
		loadFeed();
		return () => {
			mountedRef.current = false;
		};
	}, [loadFeed]);

	return (
		<FlexCenter className="Feed">
			<FeedDetail
				feed={feedValue}
				showComments
				relatedFeeds={relatedFeeds}
				showUserActions={userContext?.user !== null}
				loadingFeed={loadingFeed}
				loadingRelated={loadingRelated}
			/>
		</FlexCenter>
	);
}
