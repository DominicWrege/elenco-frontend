import React, { useCallback, useContext, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import "./PodcastPlayer.css";
import { config } from "./config";
import Episode, {
	PlayerEpisode as PodloveEpisode,
	Audio,
} from "../../models/episode";
import util from "../../functions/util";
import { FeedShort } from "../../models/feeds";
import { PlayerContext } from "../../contexts/PlayerContext";

import { PodloveWebPlayer } from "@podlove/player-react";

import {
	READY,
	REQUEST_PAUSE,
	REQUEST_PLAY,
	REQUEST_STOP,
} from "@podlove/player-actions/types";

import { requestPlay, requestPause } from "@podlove/player-actions/play";
import { PlayerAction, PlayerStatus, StoreType, Store } from "./types";
import { Button } from "antd";

export function toPlayerEpisode(
	episode: Episode,
	feed: FeedShort
): PodloveEpisode {
	const audio: Audio[] = [
		{
			url: episode.enclosure.mediaUrl,
			size: episode.enclosure.length,
			title: `${episode.title}.${
				episode.enclosure.mimeType.split("/")[1] ?? "mp3"
			}`,
			mimeType: episode.enclosure.mimeType,
		},
	];
	return {
		version: 5,
		base: "/",
		show: {
			title: feed.title,
			subtitle: feed.description,
			summary: "",
			link: feed.linkWeb,
		},
		title: episode.title,
		subtitle: episode.description,
		summary: "",
		publicationDate: episode.published ?? Date.now().toLocaleString(), //ISO 8601 DateTime
		duration: util.formatDuration(episode.duration), // ISO 8601 Duration format ([hh]:[mm]:[ss].[sss]
		poster: feed.img ?? "", //use img cache
		link: episode.webLink,
		audio: audio,
		chapter: [],
		files: audio,
		contributors: [],
		transcripts: "",
	};
}

function play(store: StoreType): void {
	store?.dispatch(requestPlay());
}

function pause(current: StoreType): void {
	current?.dispatch(requestPause());
}

function stop(current: StoreType): void {
	current?.dispatch({ type: REQUEST_STOP });
}

export const PodcastPlayer: React.FC = () => {
	const [store, setStore] = useState<StoreType>(null);
	const player = useContext(PlayerContext);

	const close = (): void => {
		stop(store);
		player?.setEpisode(null);
	};

	const callBackAction = useCallback(() => {
		if (player?.action === PlayerAction.Pause) {
			pause(store);
		} else if (player?.action === PlayerAction.Play) {
			console.log(player?.episode);
			play(store);
		}
	}, [player?.action]);

	useEffect(() => {
		callBackAction();
	}, [callBackAction]);

	const handleOnLoaded = (store: Store) => {
		setStore(store);
		store.subscribe(() => {
			const { lastAction } = store.getState();
			if (lastAction.type === REQUEST_PAUSE) {
				player?.setStatus(PlayerStatus.Pause);
			}
			if (lastAction.type === REQUEST_PLAY) {
				player?.setStatus(PlayerStatus.Playing);
			}
			if (lastAction.type === READY) {
				play(store);
			}
		});
	};

	return (
		<div
			className="PodcastPlayer"
			hidden={player?.episode === null || player?.episode === undefined}
		>
			<div className="PodcastPlayer-close">
				<Button icon={<CloseCircleOutlined />} onClick={close}></Button>
				{/* <CloseOutlined onClick={close} /> */}
			</div>
			{player?.episode && (
				<PodloveWebPlayer
					template="/podloveTemplate.html"
					episode={player?.episode.value}
					config={config}
					onLoaded={handleOnLoaded}
				/>
			)}
		</div>
	);
};

export default PodcastPlayer;
