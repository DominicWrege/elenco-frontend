import { type } from "os";
import React, { useCallback, useContext, useRef, useState } from "react";
import { useEffect } from "react";
import "./PodcastPlayer.css";
import { config } from "./config";
import Episode, { PlayerEpisode, Audio } from "../../models/episode";
import { formatDuration } from "../../functions/util";
import { FeedShort } from "../../models/feeds";
import { PodcastPlayerContext } from "../../contexts/PlayerContext";

import { INIT, READY } from "@podlove/player-actions/types";
import { requestPlay } from "@podlove/player-actions/play";

const PODCAST_PLAYER_SCRIPT = "podcast-player";

interface Props {
    hidden?: boolean
}


export enum PlayerStatus {
    Playing,
    Pause
}

// const w = window as any;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "play-button": any;
            "root": any,
            "play-state": any,
            "episode-title": any,
            "chapter-previous": any,
            "chapter-next": any,
            "show-title": any,
            "divider": any,
            "poster": any,
            "speed-control": any,
            "step-forward": any,
            "step-next": any
            "step-backward": any
            "timer-duration": any
            "tap-trigger": any,
            "volume-control": any,
            "tab-trigger": any
            "icon": any,
            "timer-current": any,
            "progress-bar": any
        }
    }
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


export function toPlayerEpisode(episode: Episode, feed: FeedShort): PlayerEpisode {

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

    const initEpisode = (episode: PlayerEpisode): void => {


        // console.log(episode);
        store?.dispatch({
            type: INIT,
            payload: { ...episode }
        });
        // store?.dispatch(requestPlay());

    }

    const initPlayer = async (): Promise<void> => {

        const playerScript = await insertPlayerScript();
        const w = window as any;
        const podLovePlayer = w.podlovePlayer;
        if (podLovePlayer && playerScript) {
            const store = await podLovePlayer(`#${playerWrapperDiv}`, player?.currentEpisode?.value, config);
            setStore(store);
            store.subscribe(() => {
                const { lastAction } = store.getState();
                if (lastAction.type === READY) {
                    store?.dispatch(requestPlay());
                }
            });
            if (player?.currentEpisode) {
                initEpisode(player?.currentEpisode.value);
            }
        }
    };

    useEffect(() => {
        if (!store && player?.currentEpisode) {
            initPlayer();
        }
        if (player?.currentEpisode) {
            console.log(player?.currentEpisode.value);
            initEpisode(player?.currentEpisode.value);
        }
    }, [player?.currentEpisode]);



    if (hidden) {
        return null;
    }

    return (
        <div id={playerWrapperDiv} data-template="/template2.html"></div>
    );
}

export default PodcastPlayer;

function createScript() {
    const scriptElement = document.createElement("script");
    scriptElement.id = PODCAST_PLAYER_SCRIPT;
    scriptElement.src = "/podlove-webplayer.js";
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