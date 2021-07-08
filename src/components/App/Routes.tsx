import { Route, Switch } from "wouter";
import { Explore } from "../../pages/Explore/Explore";
import { Feed } from "../../pages/Feed/Feed";
import FeedsByAuthorOrCategory, { FeedsBy } from "../../pages/FeedsByAuthorOrCategory/FeedsByAuthorOrCategory";
import Manage from "../../pages/Manage/Manage";
import NewFeed from "../../pages/NewFeed/NewFeed";
import RegisterLogin, { ComponentType } from "../../pages/RegisterLogin";
import SearchResults from "../../pages/SearchResults/SearchResults";
import Subscription from "../../pages/Subscription/Subscription";
import UserFeeds from "../../pages/User/UserFeeds/UserFeeds";
import Guard from "../Guard/Guard";
import { Home } from "../Home/Home";

import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export const MainRoutes =
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
        <Route path="/api">
            <SwaggerUI url="/api-spec.yaml" />
        </Route>
        <Route>
            <h2>404: nothing found!</h2>
        </Route>
    </Switch>;


export default MainRoutes;