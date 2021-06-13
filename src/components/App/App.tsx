import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import "./App.css";
import { Content, Footer } from "antd/lib/layout/layout";
import AppHeader from "../Header/Header";
import { Button, Layout } from "antd";
import { Route, Switch, useLocation } from "wouter";
import RegisterLogin, { ComponentType } from "../../pages/RegisterLogin";

import { User } from "../../models/user";
import SearchResults from "../../pages/SearchResults/SearchResults";
import { UserContext } from "../../contexts/UserContext";
import SubmitFeed from "../../pages/SubmitFeed/SubmitFeed";
import { auth } from "../../functions/auth";
import Guard from "../Guard/Guard";
import PodcastPlayer from "../PodcastPlayer/PodcastPlayer";
import { Feed } from "../Feed/Feed";
import Preview from "../../pages/Preview/Preview";
import { EpisodeContext, PlayerContext } from "../../contexts/PlayerContext";
import { PlayerAction, PlayerStatus } from "../PodcastPlayer/types";
import UserFeeds from "../../pages/User/UserFeeds/UserFeeds";



const App: React.FC = () => {
    let userCache: User | null = auth.getSession();

    const userContext = useContext(UserContext);
    const setLocation = useLocation()[1];

    const [playingEpisode, setPlayingEpisode] = useState<EpisodeContext | null>(null);
    const [playerStatus, setPlayerStatus] = useState<PlayerStatus>(PlayerStatus.Init);
    const [action, setAction] = useState<PlayerAction | null>(null);

    const playerProvideValue = useMemo(() => (
        {
            action,
            setAction,
            status: playerStatus,
            setStatus: setPlayerStatus,
            episode: playingEpisode,
            setEpisode: setPlayingEpisode
        }),
        [playingEpisode, setPlayingEpisode, playerStatus, setPlayerStatus, action, setAction]);

    const [user, setUser] = useState<User | null>(userCache);
    const userProviderValue = useMemo(() => ({ user, setUser }), [user, setUser]);


    const checkUserStatus = useCallback(async () => {
        if (auth.hasSession()) {
            try {
                const user = await auth.fetchUser();
                setUser(user);
                window.location["user"] = JSON.stringify(user);
            } catch (err) {
                //TODO 
                //- show popup message 
                //- make route LOGIN.. = "/login"; constants
                setLocation("/Login");
                console.error(err);
            }
        }
    }, []);

    useEffect(() => {
        checkUserStatus();
    }, [checkUserStatus]);

    const showUserInfo = () => {
        if (!user) {
            return "";
        }
        return <p>Hello {user?.username}, {user.permission}</p>
    }

    return (
        <div className="App">
            <UserContext.Provider value={userProviderValue}>
                <PlayerContext.Provider value={playerProvideValue} >
                    <Layout key="dsss">
                        <AppHeader key="fuck" />
                        <Content
                            className="App-pages"
                        >
                            <Switch>
                                <Route path="/">
                                    <h2>Home</h2>
                                    {
                                        showUserInfo()
                                    }
                                    <Button> fish</Button>
                                    {userContext}
                                </Route>
                                <Route path="/authors">
                                    <h2>Authors</h2>
                                </Route>
                                <Route path="/categories">
                                    <h2>Categories</h2>
                                </Route>
                                <Route path="/login">
                                    <RegisterLogin component={ComponentType.Login} />
                                </Route>
                                <Route path="/register">
                                    <RegisterLogin component={ComponentType.Register} />
                                </Route>
                                <Route path="/search/:query" component={SearchResults}>
                                </Route>
                                <Route path="/new-feed">
                                    <Guard>
                                        <SubmitFeed />
                                    </Guard>
                                </Route>
                                <Route path="/preview" component={Preview}></Route>
                                <Route path="/feed/:name" component={Feed}></Route>
                                <Route path="/user/feeds" component={UserFeeds}>
                                </Route>
                                <Route>
                                    <h2>
                                        404: nothing found!
                                    </h2>
                                </Route>
                            </Switch>
                        </Content>
                        <Footer>
                            <PodcastPlayer hidden={playingEpisode === null} />
                        </Footer>

                    </Layout>
                </PlayerContext.Provider>
            </UserContext.Provider>
        </div >
    );
};

export default App;











