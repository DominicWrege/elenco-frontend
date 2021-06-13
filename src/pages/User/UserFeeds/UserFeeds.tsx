import { Card, Descriptions, Empty, Radio, RadioChangeEvent, Typography } from "antd";
import "./UserFeeds.css";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Artwork from "../../../components/Artwork/Artwork";
import { API_URL } from "../../../env";
import { user } from "../../../functions/user";
import { FeedStatus, SubmittedFeeds, UserFeedModel } from "../../../models/feeds";
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

function renderRadioButtons(submittedFeeds: SubmittedFeeds | null): JSX.Element[] {
    return Object.keys(FeedStatus).map(status => {
        let count = 0;
        if (submittedFeeds && submittedFeeds[status.toLowerCase()]){
            count = submittedFeeds[status.toLowerCase()].length;
        }
        return (
            <Radio.Button key={status} value={status.toLowerCase()}>
                {status} ({count})
            </Radio.Button>);

    }
  
    );
}

export const UserFeeds: React.FC = () => {

    const [feedsList, setFeedsList] = useState<UserFeedModel[]>([]);
    const [submittedFeeds, setSubmittedFeeds] = useState<SubmittedFeeds | null>(null);
    const [filter, setFilter] = useState<FeedStatus>(FeedStatus.Online);

    const getFeeds = useCallback(async () => {
        try {
            const feeds: SubmittedFeeds = await user.getSubmittedFeeds();
            setSubmittedFeeds(feeds);
            setFeedsList(feeds.online);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        getFeeds();
    }, [getFeeds]);

    const handelFilterChange = (event: RadioChangeEvent): void => {
        event.preventDefault();
        const filter = event.target.value ?? "online";
        setFilter(filter);
        if (submittedFeeds){
            setFeedsList(submittedFeeds[filter] ?? []);
        }else{
            setFeedsList([]);
        }
    }


    const renderCards = (): JSX.Element[]  => {
        return feedsList
            .map((feed: UserFeedModel) => {
                return (
                    <Card
                        key={feed.title}
                        cover={
                            <Link href={`/feed/${feed.title}`} >
                                <Artwork src={`${API_URL}/img/${feed.img}`} width="100%" />
                            </Link>
                        }
                        actions={[]}
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
    // show loading
    return (
        <div className="UserFeeds">
            <Descriptions title="" size="default">
                <Descriptions.Item label="Filter">
                <Radio.Group defaultValue={filter.toLowerCase()} buttonStyle="solid" onChange={handelFilterChange}>
                        {renderRadioButtons(submittedFeeds)}
                    </Radio.Group>
                </Descriptions.Item>
            </Descriptions>
            <GridCard>
                {renderCards()}
                {feedsList.length === 0 &&
                    <Empty />
                }
            </GridCard>
        </div >
    );
};


export default UserFeeds;