import "./Manage.css";
import { Menu } from "antd";
import { Link, Route, Switch, useLocation } from "wouter";
import NewFeedOverview from "../../components/NewFeedOverview/NewFeedOverview";
import ModeratorInbox from "../../components/ModeratorInbox/ModeratorInbox";
import { FeedReviewed } from "../../components/FeedReviewed/FeedReviewed";

const pathPrefix = "/manage";

interface Item {
	key: string;
	label: string;
	child: JSX.Element;
}

const menuItems: Item[] = [
	{
		key: `${pathPrefix}/new-feeds`,
		label: "New Feeds",
		child: <NewFeedOverview />,
	},
	{
		key: `${pathPrefix}/inbox`,
		label: "My Inbox",
		child: <ModeratorInbox />,
	},
	{
		key: `${pathPrefix}/reviewed`,
		label: "All Reviewed",
		child: <FeedReviewed />,
	},
];

export const Manage: React.FC = () => {
	const [location, setLocation] = useLocation();

	const handleOnSelect = ({ item, key }) => {
		setLocation(key);
	};

	// useEffect(() => {
	// }, [location])

	return (
		<div className="Manage">
			<Menu
				className="Manage-menu"
				style={{ width: "100%" }}
				defaultSelectedKeys={[location]}
				mode="horizontal"
				onSelect={handleOnSelect}
			>
				{menuItems.map((item) => {
					return (
						<Menu.Item key={item.key}>
							<Link href="/manage/inbox">{item.label}</Link>
						</Menu.Item>
					);
				})}
			</Menu>
			<Switch>
				{menuItems.map((item) => {
					return (
						<Route key={item.key} path={item.key}>
							{item.child}
						</Route>
					);
				})}
			</Switch>
		</div>
	);
};

export default Manage;
// {/* <Route path={`${pathPrefix}/new-feeds`}>
// 	<NewFeedOverview />
// </Route>
// <Route path={`${pathPrefix}/inbox`}>
// 	<ModeratorInbox />
// // </Route> */}
