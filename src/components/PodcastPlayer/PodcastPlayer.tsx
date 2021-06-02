import { type } from "os";
import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import "./PodcastPlayer.css";
import { config } from "./config";
import episode from "./epsiode";
import Title from "antd/lib/typography/Title";

// import "Player.css"

const PODCAST_PLAYER_ID = "podcast-player";

interface Props {
    name: string;
    onChange?: (bob: string) => void;
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
    let playerScript = document.querySelector(`#${PODCAST_PLAYER_ID}`) as HTMLScriptElement | undefined;
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


export const PodcastPlayer: React.FC<Props> = (props) => {


    const [counter, setCounter] = useState<Number>(100);

    useEffect(() => {
        insertPlayerScript().then(playerScript => {
            console.log(playerScript);
            const w = window as any;
            const podLovePlayer = w.podlovePlayer;
            if (podLovePlayer && playerScript) {
                podLovePlayer("#player-div", episode, config).then((store: any) => {
                    // store.subscribe(() => {
                    //     console.log(store.getState());
                    // });
                });
            }
        });
        // if (podLovePlayer) {
        //     podLovePlayer("#player-div", episode, config).then((store: any) => {
        //         store.subscribe(() => {
        //             //console.log(store.getState());
        //             console.log("das");
        //         });
        //     });
        // }
        //insertPlayer();
    }, []);


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
    const s = { maxWidth: "950px", minWidth: "400px" };
    return (
        <div className="Player-wrapper" >
            <Title level={4}>Episodes</Title>
            <div id="player-div" data-template="/podlove-template.html"
                style={{ maxWidth: "950px", minWidth: "450px" }} >
            </div>
        </div >
    );
}

export default PodcastPlayer;

function createScript() {
    const scriptElement = document.createElement("script");
    scriptElement.id = PODCAST_PLAYER_ID;
    scriptElement.src = "/podlove-webplayer.js";
    return scriptElement;
}
