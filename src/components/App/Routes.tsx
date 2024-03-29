import { Link, Route, Switch } from "wouter";
import { Explore } from "../../pages/Explore/Explore";
import { Feed } from "../../pages/Feed/Feed";
import FeedsByAuthorOrCategory, {
	FeedsBy,
} from "../../pages/FeedsByAuthorOrCategory/FeedsByAuthorOrCategory";
import Manage from "../../pages/Manage/Manage";
import NewFeed from "../../pages/NewFeed/NewFeed";
import RegisterLogin, { ComponentType } from "../../pages/RegisterLogin";
import SearchResults from "../../pages/SearchResults/SearchResults";
import Subscription from "../../pages/Subscription/Subscription";
import UserFeeds from "../../pages/User/UserFeeds/UserFeeds";
import Guard from "../Guard/Guard";
import { Home } from "../../pages/Home/Home";

import { Button, Result } from "antd";
import Episode from "../Episode/Episode";
import Swagger from "../Swagger/Swagger";
import Faq from "../Faq/Faq";

export const MainRoutes = (
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
		<Route path="/feed/:feed_title/:episode_id">
			<Episode />
		</Route>
		<Route path="/manage/:path">
			<Guard adminOnly>
				<Manage />
			</Guard>
		</Route>
		<Route path="/api">
			<Swagger />
		</Route>
		<Route path="/faq">
			<Faq />
		</Route>
		<Route>
			<Result
				status="404"
				title="404 Not Found"
				subTitle="Sorry, the resource you visited does not exist."
				extra={
					<Link href="/">
						<Button type="primary">Back Home</Button>
					</Link>
				}
			/>
			,
		</Route>
	</Switch>
);

export default MainRoutes;
