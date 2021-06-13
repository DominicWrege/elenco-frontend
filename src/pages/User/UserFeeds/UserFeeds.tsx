import { Card, Descriptions, Radio, RadioChangeEvent, Typography } from "antd";
import "./UserFeeds.css";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Artwork from "../../../components/Artwork/Artwork";
import { API_URL } from "../../../env";
import { user } from "../../../functions/user";
import { FeedStatus, UserFeedModel } from "../../../models/feeds";
const { Title, Link } = Typography;

const GridCard = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, 16rem);
    gap: 1.5em;
    .ant-card-body {
        padding: 0.75em;
    }

`;

function renderRadioButtons(): JSX.Element[] {
    const initRadio = [<Radio.Button value={null}>All</Radio.Button>];
    const radios: JSX.Element[] = Object.keys(FeedStatus).map(status =>
        <Radio.Button value={status}>{status}</Radio.Button>
    );
    return initRadio.concat(radios);
}

function compareBystatus(feed: UserFeedModel, filterBy: FeedStatus | null): boolean {

    if (!filterBy) {
        return true;
    }

    return feed.status === filterBy;
}

export const UserFeeds: React.FC = () => {

    const [feeds, setFeeds] = useState<UserFeedModel[]>([]);

    const [filter, setFilter] = useState<FeedStatus | null>(null);

    const getFeeds = useCallback(async () => {
        try {
            const feeds: UserFeedModel[] = await user.getSubmittedFeeds();
            console.log(feeds);

            setFeeds(feeds);

        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        getFeeds();
    }, [getFeeds]);

    const handelFilterChange = (event: RadioChangeEvent): void => {
        event.preventDefault();
        setFilter(event.target.value);
    }

    const renderCards = (): JSX.Element[] | null => {
        if (feeds.length === 0) {
            return null;
        }

        return feeds
            .filter(feed => compareBystatus(feed, filter))
            .map((feed: UserFeedModel) => {
                return (
                    <Card
                        key={feed.title}
                        cover={
                            <Link href={`/feed/${feed.title}`} >
                                <Artwork src={`${API_URL}/img/${feed.img}`} width="100%" />
                            </Link>
                        }
                        actions={[

                        ]}
                    >
                        <Link href={`/feed/${feed.title}`} >
                            <Title level={4} >
                                {feed.title}
                            </Title>
                        </Link>
                        <small style={{ cursor: "pointer" }}>{feed.author_name}</small><br />
                        <small>{feed.status}</small>
                    </Card>
                );
            });

    };

    return (
        <div className="UserFeeds">
            
               
            <Descriptions title="" size="default">

                <Descriptions.Item label="Filter">
                <Radio.Group defaultValue={filter} buttonStyle="solid" onChange={handelFilterChange}>
                        {renderRadioButtons()}
                    </Radio.Group>
                </Descriptions.Item>
            </Descriptions>
            <GridCard>
                {renderCards()}
            </GridCard>
        </div >
    );
};


export default UserFeeds;