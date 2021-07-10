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
import {
	PlayerContext,
	PodcastPlayerContext,
} from "../../contexts/PlayerContext";

import {
	INIT,
	READY,
	REQUEST_PAUSE,
	REQUEST_PLAY,
	// STOP,
} from "@podlove/player-actions/types";
import { requestPlay, requestPause } from "@podlove/player-actions/play";
import { PlayerAction, PlayerStatus, StoreType } from "./types";
import { Button } from "antd";

const PODCAST_PLAYER_SCRIPT = "podcast-player";
const PODLOVE_FILE = "/web-player/embed.js";

const playerWrapperDiv = "Player-wrapper";

async function insertPlayerScript(): Promise<HTMLScriptElement> {
	const w = window as any;
	let playerScript = document.querySelector(`#${PODCAST_PLAYER_SCRIPT}`) as
		| HTMLScriptElement
		| undefined;
	console.log("aa");
	return new Promise((resolve, _reject) => {
		if (!playerScript || !w.podLovePlayer) {
			const playerScript = createScript();
			document.head.appendChild(playerScript);
			playerScript.addEventListener("load", () => {
				console.log(playerScript);

				resolve(playerScript);
			});
		} else {
			resolve(playerScript);
		}
	});
}

export function toPlayerEpisode(
	episode: Episode,
	feed: FeedShort
): PodloveEpisode {
	const audio: Audio[] = [
		{
			url: episode.enclosure.mediaUrl,
			size: episode.enclosure.length,
			title: `${episode.title}.${episode.enclosure.mimeType.split("/")[1] ?? "mp3"
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

function createScript(): HTMLScriptElement {
	const scriptElement = document.createElement("script");
	scriptElement.id = PODCAST_PLAYER_SCRIPT;
	scriptElement.src = PODLOVE_FILE;
	return scriptElement;
}


function playEpisode(store: StoreType): void {
	store?.dispatch(requestPlay());
}

function pauseEpisode(current: StoreType): void {
	current?.dispatch(requestPause());
}

function initEpisode(store: StoreType, episode: PodloveEpisode): void {
	store?.dispatch({
		type: INIT,
		payload: { ...episode },
	});
	// store?.dispatch(requestPlay());
}

async function initPlayer(
	setStore: React.Dispatch<React.SetStateAction<StoreType>>,
	player: PodcastPlayerContext,
	setHidden: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
	const playerScript = await insertPlayerScript(); // load player into windows global object
	const win = window as any;
	const podLovePlayer = win.podlovePlayer;
	if (podLovePlayer && playerScript) {
		const store = await podLovePlayer(
			`#${playerWrapperDiv}`,
			player?.episode?.value,
			config
		);
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
				setHidden(false);
				playEpisode(store);
			}
		});
	}
}

export const PodcastPlayer: React.FC = () => {
	const [store, setStore] = useState<StoreType>(null);
	const player = useContext(PlayerContext);
	const [hidden, setHidden] = useState(true);

	const episodeCallback = useCallback(() => {
		if (!store && player?.episode) {
			initPlayer(setStore, player, setHidden);
			initEpisode(store, player?.episode.value);
			playEpisode(store);
		}
		if (player?.episode) {
			// console.log(player?.episode.value);
			initEpisode(store, player?.episode.value);
		}
		// console.log(player?.action);
		// eslint-disable-next-line
	}, [player?.episode]);

	const close = () => {
		setHidden(true);
		pauseEpisode(store);
		player?.setEpisode(null);
		console.log(store);

		// store?.dispatch({
		// 	type: "PLAYER_STOP",
		// });
	};

	useEffect(() => {
		episodeCallback();
	}, [episodeCallback]);

	const callBackAction = useCallback(() => {
		if (player?.action === PlayerAction.Pause) {
			pauseEpisode(store);
		} else if (player?.action === PlayerAction.Play) {
			playEpisode(store);
		}
	}, [player?.action]);

	useEffect(() => {
		callBackAction();
	}, [callBackAction]);

	return (
		<div hidden={hidden}>
			<div className="PodcastPlayer-close">
				<Button icon={<CloseCircleOutlined />} onClick={close}></Button>
				{/* <CloseOutlined onClick={close} /> */}
			</div>
			<div id={playerWrapperDiv} data-template="/podloveTemplate.html"></div>
		</div>
	);
};

export default PodcastPlayer;
