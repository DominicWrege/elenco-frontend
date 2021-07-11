import React, { useCallback, useContext, useState } from "react";
import Episode, { EpisodeNext } from "../../models/episode";
import EpisodeItem from "../EpisodeItem/EpisodeItem";
import { Button, List } from "antd";
import { FeedShort } from "../../models/feeds";
import { EpisodeContext as EpsiodeContext, PlayerContext, PodcastPlayerContext } from "../../contexts/PlayerContext";
import { PlayerStatus } from "../PodcastPlayer/types";
import api from "../../functions/api";
import styled from "styled-components";

interface Properties {
	episodes: EpisodeNext,
	feedId?: number,
	feedMeta: FeedShort;
}


const LoadingButtonWrapper = styled.div`
		display: flex;
		margin-top: 1rem;
		justify-content: center;
`;

const EpisodeList: React.FC<Properties> = ({ episodes, feedMeta, feedId }) => {
	const context = useContext<PodcastPlayerContext | null>(PlayerContext);

	const status = context?.status;

	const [isLoadingMore, setisLoadingMore] = useState(false);

	const [innerEpisodes, setInnerEpisodes] = useState(episodes);

	const loadMoreEpisodes = async () => {

		try {
			if (feedId && innerEpisodes?.offset) {
				setisLoadingMore(true);
				const episodesJson = await api.getMoreEpsiodes(feedId, innerEpisodes.offset);

				setInnerEpisodes({ items: [...episodes.items, ...episodesJson.items], offset: episodesJson.offset })
			}

		} catch (err) {
			console.log(err);
		} finally {
			setisLoadingMore(false);
		}
	};

	const renderNextButton = (): JSX.Element | null => {
		if (innerEpisodes.offset) {
			return (
				<LoadingButtonWrapper>
					<Button type="default" onClick={loadMoreEpisodes} loading={isLoadingMore}>Show More Episodes</Button>
				</LoadingButtonWrapper>
			);
		}
		return null;
	}

	const setEpisodeStatus = useCallback(
		(
			episode: Episode | null,
			playingEpisode: EpsiodeContext | null | undefined
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
