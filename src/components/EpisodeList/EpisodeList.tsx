import React, { useCallback, useEffect, useRef, useState } from "react";
import Episode, { EpisodeNext } from "../../models/episode";
import EpisodeItem from "../EpisodeItem/EpisodeItem";
import { Button, List } from "antd";
import { FeedShort } from "../../models/feeds";
import styled from "styled-components";
import episode from "../../functions/episode";

interface Properties {
	episodesList?: Episode[] | null;
	feedMeta: FeedShort;
	pagination?: boolean;
}

const LoadingButtonWrapper = styled.div`
	display: flex;
	margin-top: 1rem;
	justify-content: center;
`;

const EpisodeList: React.FC<Properties> = React.memo(
	({ episodesList, feedMeta, pagination = false }) => {
		const mountedRef = useRef(true);
		// const context = useContext<PodcastPlayerContext | null>(PlayerContext);

		// const status = context?.status;

		const [isLoadingMore, setIsLoadingMore] = useState(false);
		const [episodes, setEpisodes] = useState<EpisodeNext | null>(null);

		/*eslint-disable */
		const init = useCallback(async () => {
			if (feedMeta.id && !episodesList) {
				const episodesJson = await episode.lazyLoad(feedMeta.id, 0);
				setEpisodes(episodesJson);
			}
			//
		}, [feedMeta]);
		/*eslint-disable */

		useEffect(() => {
			init();
			return () => {
				mountedRef.current = false;
			};
		}, [init]);

		const loadMoreEpisodes = async () => {
			try {
				if (feedMeta.id && episodes?.offset) {
					setIsLoadingMore(true);
					const episodesJson = await episode.lazyLoad(
						feedMeta.id,
						episodes.offset
					);

					setEpisodes({
						items: [...episodes.items, ...episodesJson.items],
						offset: episodesJson.offset,
					});
				}
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoadingMore(false);
			}
		};

		const renderNextButton = (): JSX.Element | null => {
			if (episodes?.offset) {
				return (
					<LoadingButtonWrapper>
						<Button
							type="default"
							onClick={loadMoreEpisodes}
							loading={isLoadingMore}
						>
							Show More Episodes
						</Button>
					</LoadingButtonWrapper>
				);
			}
			return null;
		};

		const isLoading = () => {
			if (episodesList) {
				return false;
			}
			if (!episodes) {
				return true;
			}

			return false;
		};
		return (
			<List
				loading={isLoading()}
				size="large"
				pagination={
					pagination
						? { defaultPageSize: 50, hideOnSinglePage: true, simple: true }
						: undefined
				}
				rowKey={(episode) => episode.guid ?? episode.id}
				dataSource={episodesList ?? episodes?.items}
				loadMore={renderNextButton()}
				renderItem={(episode) => (
					<EpisodeItem
						key={episode.guid ?? episode.id}
						episode={episode}
						feedMeta={feedMeta}
					></EpisodeItem>
				)}
			/>
		);
	}
);

export default EpisodeList;
