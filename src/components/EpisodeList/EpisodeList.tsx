import React, { useCallback, useContext, useState } from "react";
import Episode, { EpisodeNext } from "../../models/episode";
import EpisodeItem from "../EpisodeItem/EpisodeItem";
import { Button, List } from "antd";
import { FeedShort } from "../../models/feeds";
import {
	EpisodeContext,
	PlayerContext,
	PodcastPlayerContext,
} from "../../contexts/PlayerContext";
import { PlayerStatus } from "../PodcastPlayer/types";
import api from "../../functions/api";
import styled from "styled-components";

interface Properties {
	episodes: EpisodeNext;
	feedMeta: FeedShort;
	pagination?: boolean;
}

const LoadingButtonWrapper = styled.div`
	display: flex;
	margin-top: 1rem;
	justify-content: center;
`;

const EpisodeList: React.FC<Properties> = ({
	episodes,
	feedMeta,
	pagination = false,
}) => {
	const context = useContext<PodcastPlayerContext | null>(PlayerContext);

	const status = context?.status;

	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const [innerEpisodes, setInnerEpisodes] = useState(episodes);

	const loadMoreEpisodes = async () => {
		try {
			if (feedMeta.id && innerEpisodes?.offset) {
				setIsLoadingMore(true);
				const episodesJson = await api.getMoreEpisodes(
					feedMeta.id,
					innerEpisodes.offset
				);

				setInnerEpisodes({
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
		if (innerEpisodes.offset) {
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

	const setEpisodeStatus = useCallback(
		(
			episode: Episode | null,
			playingEpisode: EpisodeContext | null | undefined
		): PlayerStatus => {
			if (episode?.guid === playingEpisode?.guid) {
				return status ?? PlayerStatus.Pause;
			}
			return PlayerStatus.Pause;
		},
		[status]
	);

	return (
		<List
			size="large"
			pagination={
				pagination
					? { defaultPageSize: 50, hideOnSinglePage: true, simple: true }
					: undefined
			}
			rowKey={(episode) => episode.guid ?? Math.random() * 1000}
			dataSource={innerEpisodes.items}
			loadMore={renderNextButton()}
			renderItem={(episode) => (
				<EpisodeItem
					key={episode.guid ?? Math.random() * 1000}
					episode={episode}
					feedMeta={feedMeta}
					status={setEpisodeStatus(episode, context?.episode)}
				></EpisodeItem>
			)}
		/>
	);
};

export default EpisodeList;
