import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Content, Footer } from "antd/lib/layout/layout";
import AppHeader from "../Header/Header";
import { Layout } from "antd";
import { Route, Switch, useLocation } from "wouter";
import RegisterLogin, { ComponentType } from "../../pages/RegisterLogin";

import { User } from "../../models/user";
import SearchResults from "../../pages/SearchResults/SearchResults";
import { UserContext } from "../../contexts/UserContext";
import { auth } from "../../functions/auth";
import Guard from "../Guard/Guard";
import PodcastPlayer from "../PodcastPlayer/PodcastPlayer";
import { Feed } from "../../pages/Feed/Feed";
import { EpisodeContext, PlayerContext } from "../../contexts/PlayerContext";
import { PlayerAction, PlayerStatus } from "../PodcastPlayer/types";
import UserFeeds from "../../pages/User/UserFeeds/UserFeeds";
import Subscription from "../../pages/Subscription/Subscription";
import { Explore } from "../../pages/Explore/Explore";
import FeedsByAuthorOrCategory, {
	FeedsBy,
} from "../../pages/FeedsByAuthorOrCategory/FeedsByAuthorOrCategory";
import NewFeed from "../../pages/NewFeed/NewFeed";
import Manage from "../../pages/Manage/Manage";
import { Home } from "../Home/Home";

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
				//TODO
				//- show popup message
				//- make route LOGIN.. = "/login"; constants
				setLocation("/Login");
				console.error(err);
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
						<Content className="App-pages">
							<Switch>
								<Route path="/">
									<Home />
								</Route>
								<Route path="/authors">
									<h2>Authors</h2>
								</Route>
								<Route path="/explore" component={Explore}></Route>
								<Route path="/login">
									<RegisterLogin component={ComponentType.Login} />
								</Route>
								<Route path="/register">
									<RegisterLogin component={ComponentType.Register} />
								</Route>
								<Route path="/search/:query" component={SearchResults}></Route>
	
								<Route path="/new/:path" component={NewFeed}></Route>
								{/* <Route path="/preview" component={Preview}></Route> */}
								<Route path="/feed/:name" component={Feed}></Route>
								<Route path="/category/:category">
									<FeedsByAuthorOrCategory
										config={FeedsBy.Category}
									></FeedsByAuthorOrCategory>
								</Route>
								<Route path="/author/:author">
									<FeedsByAuthorOrCategory
										config={FeedsBy.Author}
									></FeedsByAuthorOrCategory>
								</Route>
								<Route path="/user/feeds" component={UserFeeds}></Route>
								<Route path="/user/subscriptions">
									<Guard>
										<Subscription />
									</Guard>
								</Route>
								<Route path="/manage/:path">
									<Guard adminOnly>
										<Manage />
									</Guard>
								</Route>
								<Route>
									<h2>404: nothing found!</h2>
								</Route>
							</Switch>
						</Content>
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
