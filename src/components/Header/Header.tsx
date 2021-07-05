import React, { useContext } from "react";
import "./Header.css";
import { Row, Col, PageHeader, Button, Dropdown, Menu, Typography } from "antd";
import { Link, useLocation } from "wouter";
import { UserOutlined } from "@ant-design/icons";
import { auth } from "../../functions/auth";
import SearchField from "../SearchField/SearchField";
import { UserContext } from "../../contexts/UserContext";

function AppHeader(): JSX.Element {
	const userContext = useContext(UserContext);
	const setLocation = useLocation()[1];

	const handleLogout = async () => {
		try {
			auth.logout();
		} catch (e) {
			console.log(e);
		}
		userContext?.setUser(null);
		setLocation("/login");
	};

	const menu = (
		<Menu>
			<Menu.Item key="Menu1" icon={<UserOutlined />}>
				Signed in as {userContext?.user?.username}
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="Menu2">
				<Link href="/user/subscriptions">My Subscriptions</Link>
			</Menu.Item>
			<Menu.Item key="Menu3">
				<Link href="/user/feeds">My Submitted Podcasts</Link>
			</Menu.Item>
			<Menu.Item key="Menu4">
				<Link href="/new/feed">Submit a new Podcast</Link>
			</Menu.Item>
			<Menu.Divider />
			{auth.isAdmin(userContext?.user) && (
				<Menu.Item key="Menu5">
					<Link href="/manage/new-feeds">Manage</Link>
				</Menu.Item>
			)}
			<Menu.Divider />
			<Menu.Item key="Menu6" onClick={handleLogout}>
				Logout
			</Menu.Item>
		</Menu>
	);

	const userMenu = (): JSX.Element => {
		if (userContext?.user) {
			return (
				<Dropdown.Button
					key="dbgasi21"
					overlay={menu}
					placement="bottomLeft"
					icon={<UserOutlined />}
				></Dropdown.Button>
			);
		} else {
			return (
				<Link key="link771" href="/login" className="active">
					<Button>Login</Button>
				</Link>
			);
		}
	};

	return (
		<header>
			<div className="Header-inner">
				<div id="Header-title">
					<Link href="/" id="Header-title">
						<Typography.Title level={1}>Elenco</Typography.Title>
					</Link>
				</div>
				<div id="Header-search">
					<SearchField />
				</div>
				<div id="Header-btn">
					<Link href="/explore" className="active">
						<Button type="primary" ghost>
							Explore
						</Button>
					</Link>
				</div>
				<div id="Header-menu">{userMenu()}</div>
			</div>
		</header>
	);
}

export default AppHeader;
// {/* className="Header" */}
// {/* title={<Link href=" /"> Elenco</Link>} */}
// {/* tags={
// 	<Row gutter={8}>
// 		<Col md={16} xs={20}>
// 			<SearchField />
// 		</Col>
// 		<Col md={8} xs={2} className="Header-links">
// 			<Link href="/explore" className="active">
// 				<Button type="primary" ghost>
// 					Explore
// 				</Button>
// 			</Link>
// 		</Col>
// 		{/* <Dropdown overlay={menu2} placement="bottomCenter" arrow>
//                 <Button>Explore</Button>
//             </Dropdown> */}
// 	{/* </Row>
// }
// extra={[userMenu()]} */} */}
