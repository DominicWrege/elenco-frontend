import { type } from "os";
import React, { useCallback, useContext, useRef, useState } from "react";
import { useEffect } from "react";
import "./PodcastPlayer.css";
import { config } from "./config";
import Episode, { PlayerEpisode as PodloveEpisode, Audio } from "../../models/episode";
import { formatDuration } from "../../functions/util";
import { FeedShort } from "../../models/feeds";
import { PodcastPlayerContext } from "../../contexts/PlayerContext";

import { INIT, READY, REQUEST_PAUSE, REQUEST_PLAY } from "@podlove/player-actions/types";
import { requestPlay, requestPause } from "@podlove/player-actions/play";

const PODCAST_PLAYER_SCRIPT = "podcast-player";

interface Props {
    hidden?: boolean
}

export enum PlayerStatus {
    Init = 0,
    Playing,
    Pause
}


export enum PlayerAction {
    Play,
    Pause
}

async function insertPlayerScript(): Promise<HTMLScriptElement> {
    const w = window as any;
    let playerScript = document.querySelector(`#${PODCAST_PLAYER_SCRIPT}`) as HTMLScriptElement | undefined;
    return new Promise((resolve, _reject) => {
        if (!playerScript || !w.podLovePlayer) {
            const playerScript = createScript();
            document.head.appendChild(playerScript);
            playerScript.addEventListener("load", () => {
                resolve(playerScript);
            });
        } else {
            resolve(playerScript);
        }
    });

};


export function toPlayerEpisode(episode: Episode, feed: FeedShort): PodloveEpisode {

    const audio: Audio[] = [
        {
            url: episode.enclosure.mediaUrl,
            size: episode.enclosure.length,
            title: `${episode.title}.${episode.enclosure.mimeType.split("/")[1] ?? "mp3"}`,
            mimeType: episode.enclosure.mimeType
        }
    ]
    return {
        version: 5,
        base: "/",
        show: {
            title: feed.title,
            subtitle: feed.description,
            summary: "",
            link: feed.linkWeb
        },
        title: episode.title,
        subtitle: episode.description,
        summary: "",
        publicationDate: episode.published ?? Date.now().toLocaleString(), //ISO 8601 DateTime
        duration: formatDuration(episode.duration), // ISO 8601 Duration format ([hh]:[mm]:[ss].[sss]
        poster: feed.img ?? "", //use img cache
        link: episode.webLink,
        audio: audio,
        chapter: [],
        files: audio,
        contributors: [],
        transcripts: ""
    }
}


export const PodcastPlayer: React.FC<Props> = ({ hidden = true }) => {

    const playerWrapperDiv = "Player-wrapper";
    const player = useContext(PodcastPlayerContext);
    const [store, setStore] = useState<any>(null);

    const initEpisode = (episode: PodloveEpisode): void => {
        store?.dispatch({
            type: INIT,
            payload: { ...episode }
        });
        store?.dispatch(requestPlay());
    }

    const playEpisode = (store?: any): void => {
        store?.dispatch(requestPlay());

    };
    const pauseEpisode = (store?: any): void => {
        store?.dispatch(requestPause());
    };


    const initPlayer = async (): Promise<void> => {

        const playerScript = await insertPlayerScript();
        const w = window as any;
        const podLovePlayer = w.podlovePlayer;
        if (podLovePlayer && playerScript) {
            const store = await podLovePlayer(`#${playerWrapperDiv}`, player?.episode?.value, config);
            setStore(store);
            store.subscribe(() => {
                const { lastAction } = store.getState();
                // console.log(store.getState());
                if (lastAction.type === REQUEST_PAUSE) {
                    player?.setStatus(PlayerStatus.Pause);
                }
                if (lastAction.type === REQUEST_PLAY) {
                    player?.setStatus(PlayerStatus.Playing);
                }
                if (lastAction.type === READY) {
                    playEpisode(store);
                }
            });

            if (player?.episode) {
                initEpisode(player?.episode.value);
            }
        }
    };

    useEffect(() => {
        if (!store && player?.episode) {
            initPlayer();
        }
        if (player?.episode) {
            // console.log(player?.episode.value);
            initEpisode(player?.episode.value);
        }
    }, [player?.episode]);

    useEffect(() => {
        if (player) {
            switch (++player!.action!) {
                case PlayerStatus.Pause:
                    pauseEpisode(store);
                    break;
                case PlayerStatus.Playing:
                    playEpisode(store);
                    break;
                default:
                    break
            }

        }
    }, [player?.action]);



    if (hidden) {
        return null;
    }
    return (
        <div id={playerWrapperDiv} data-template="/podloveTemplate.html"></div>
    );
}

export default PodcastPlayer;

function createScript() {
    const scriptElement = document.createElement("script");
    scriptElement.id = PODCAST_PLAYER_SCRIPT;
    scriptElement.src = "/podlove-webplayer_v5.js";
    return scriptElement;
}



    // const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     //props.onChange("hi from player");
    // };
    // const onButtonCounterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     setCounter(counter.valueOf() - 5);
    //     const c = new CustomEvent("wow", { detail: 1 })
    //     let a = document.querySelector("#pl");
    //     if (a) {
    //         a.dispatchEvent(c);
    //     }

    // };