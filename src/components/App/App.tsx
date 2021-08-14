import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Content, Footer } from "antd/lib/layout/layout";
import AppHeader from "../Header/Header";
import { Layout } from "antd";
import { useLocation } from "wouter";

import { User } from "../../models/user";
import { UserContext } from "../../contexts/UserContext";
import { auth } from "../../functions/auth";
import PodcastPlayer from "../PodcastPlayer/PodcastPlayer";
import { EpisodeContext, PlayerContext } from "../../contexts/PlayerContext";
import { PlayerAction, PlayerStatus } from "../PodcastPlayer/types";

import MainRoutes from "./Routes";

const App: React.FC = () => {
	let userCache: User | null = auth.getSession();

	const setLocation = useLocation()[1];

	const [playingEpisode, setPlayingEpisode] = useState<EpisodeContext | null>(
		null
	);
	const [playerStatus, setPlayerStatus] = useState<PlayerStatus>(
		PlayerStatus.Init
	);
	const [action, setAction] = useState<PlayerAction | null>(null);

	const playerProvideValue = useMemo(
		() => ({
			action,
			setAction,
			status: playerStatus,
			setStatus: setPlayerStatus,
			episode: playingEpisode,
			setEpisode: setPlayingEpisode,
		}),
		[
			playingEpisode,
			setPlayingEpisode,
			playerStatus,
			setPlayerStatus,
			action,
			setAction,
		]
	);

	const [user, setUser] = useState<User | null>(userCache);
	const userProviderValue = useMemo(() => ({ user, setUser }), [user, setUser]);

	const checkUserStatus = useCallback(async () => {
		if (auth.hasSession()) {
			try {
				const userJson = await auth.fetchUser();
				setUser(userJson);
				window.location["user"] = JSON.stringify(userJson);
			} catch (err) {
				setLocation("/Login");
				console.error({ ...err });
			}
		}
	}, [setLocation]);

	useEffect(() => {
		checkUserStatus();
	}, [checkUserStatus]);

	return (
		<div className="App">
			<UserContext.Provider value={userProviderValue}>
				<PlayerContext.Provider value={playerProvideValue}>
					<Layout>
						<AppHeader />
						<Content className="App-pages">{MainRoutes}</Content>
						<Footer>
							<PodcastPlayer />
						</Footer>
					</Layout>
				</PlayerContext.Provider>
			</UserContext.Provider>
		</div>
	);
};

export default App;
