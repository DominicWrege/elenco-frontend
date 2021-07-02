import "./Manage.css";
import NewFeeds from "../../components/NewFeedsTable/NewFeedsTable";
import { Menu } from "antd";
import { Link, Route, Switch, useLocation } from "wouter";

const menuItems = [
	{
		key: "newFeeds",
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
				defaultSelectedKeys={["newFeeds"]}
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
				<Route path={`${pathPrefix}/newFeeds`}>
					<NewFeeds />
				</Route>
				<Route path={`${pathPrefix}/inbox`}>
					<h2>comming sooooooooooooooooooooooonnnnnnnnnnnnnn.....</h2>
				</Route>
				<Route>das</Route>
			</Switch>
		</div>
	);
};

export default Manage;
