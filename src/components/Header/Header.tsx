import React, { useContext } from "react";
import "./Header.css";
import { Row, Col, PageHeader, Button, Dropdown, Menu } from "antd";
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
    <Menu className="Header-menu">
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
        <Link href="/new-feed">Submit a new Podcast</Link>
      </Menu.Item>
      <Menu.Item key="Menu5" onClick={handleLogout}>
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
        <Link key="dhsaudhasuo" href="/login" className="active">
          <Button>Login</Button>
        </Link>
      );
    }
  };

  return (
    <PageHeader
      key="aaasdsadsada"
      className="Header-background"
      title={<Link href=" /"> Elenco</Link>}
      tags={
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={16}>
            <SearchField />
          </Col>
          <Col span={8} className="Header-links">
            <a href="/explore" className="active">
              <Button type="primary" ghost>
                Explore
              </Button>
            </a>
          </Col>
          {/* <Dropdown overlay={menu2} placement="bottomCenter" arrow>
                            <Button>Explore</Button>
                        </Dropdown> */}
        </Row>
      }
      extra={[userMenu()]}
    />
  );
}

export default AppHeader;
