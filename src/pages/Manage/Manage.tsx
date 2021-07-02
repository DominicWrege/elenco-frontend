import "./Manage.css";
import { Menu } from "antd";
import { Link, Route, Switch, useLocation } from "wouter";
import NewFeedOverview from "../../components/NewFeedOverview/NewFeedOverview";
import ModeratorInbox from "../../components/ModeratorInbox/ModeratorInbox";

const menuItems = [
	{
		key: "new-feeds",
		label: "New Feeds",
	},
	{
		key: "inbox",
		label: "My Inbox",
	},
];

const pathPrefix = "/manage";

export const Manage: React.FC = () => {
	const setLocation = useLocation()[1];
	const handleOnSelect = ({ item, key }) => {
		console.log(item);
		console.log(key);
		setLocation(`${pathPrefix}/${key}`);
	};

	return (
		<div className="Manage">
			<Menu
				className="Manage-menu"
				style={{ width: "100%" }}
				defaultSelectedKeys={["new-feeds"]}
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
				<Route path={`${pathPrefix}/new-feeds`}>
					<NewFeedOverview />
				</Route>
				<Route path={`${pathPrefix}/inbox`}>
					<ModeratorInbox />
				</Route>
				<Route>404</Route>
			</Switch>
		</div>
	);
};

export default Manage;
