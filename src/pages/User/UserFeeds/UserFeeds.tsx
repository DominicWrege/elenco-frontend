import { Card, Descriptions, Empty, Radio, RadioChangeEvent, Select, Typography } from "antd";
import "./UserFeeds.css";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Artwork from "../../../components/Artwork/Artwork";
import { API_URL } from "../../../env";
import { user } from "../../../functions/user";
import { FeedStatus, SubmittedFeeds, UserFeedModel } from "../../../models/feeds";
import { LabeledValue } from "antd/lib/select";
import { Link } from "wouter";
const { Title } = Typography;

const GridCard = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, 18rem);
    gap: 1.5em;
    .ant-card-body {
        padding: 0.75em;
        height: 7rem;
    }


`;

function renderRadioButtons(submittedFeeds: SubmittedFeeds | null): JSX.Element[] {
    return Object.keys(FeedStatus).map(status => {
        let count = 0;
        if (submittedFeeds && submittedFeeds[status.toLowerCase()]) {
            count = submittedFeeds[status.toLowerCase()].length;
        }
        return (
            <Radio.Button key={status} value={status.toLowerCase()}>
                {status} ({count})
            </Radio.Button>);

    }

    );
}

interface SortByValue {
    name: string,
    compareFn: (feedA: UserFeedModel, feedB: UserFeedModel) => number
}

const sortBy: SortByType = {
    title: {
        name: "Titel",
        compareFn: (feedA: UserFeedModel, feedB: UserFeedModel): number => {
            return feedA.title.localeCompare(feedB.title);
        }   
    },
    author: {
        name: "Author",
        compareFn: (feedA: UserFeedModel, feedB: UserFeedModel): number => {
            return feedA.authorName.localeCompare(feedB.authorName);
        }   
    }
};

interface SortByType {
    title: SortByValue,
    author: SortByValue
}

function renderSortByOptions(sortBy: SortByType): JSX.Element[]{
    return Object.entries(sortBy).map(([key, prop]: [string, any]) =>{
        return <Select.Option key={prop.name} value={key}>{prop.name}</Select.Option>;
    });

}

let submittedFeeds: SubmittedFeeds | null  = null;

export const UserFeeds: React.FC = () => {

    const [feedsList, setFeedsList] = useState<UserFeedModel[]>([]);
    const [filter, setFilter] = useState<FeedStatus>(FeedStatus.Online);
    const [currentSortBy, setCurrentSortBy] = useState<SortByValue>(sortBy.title);    
    const getFeeds = useCallback(async () => {
        try {
            const feeds: SubmittedFeeds = await user.getSubmittedFeeds();
            submittedFeeds = feeds;
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
        if (submittedFeeds) {
            setFeedsList(submittedFeeds[filter] ?? []);
        } else {
            setFeedsList([]);
        }
    }
    const handelSortChange = (value: string | number | LabeledValue, _option: any) :void =>{
        setCurrentSortBy(sortBy[value.toString()]);           
    };

    const renderCards = (): JSX.Element[] => {
        return feedsList
            .sort((a: UserFeedModel, b: UserFeedModel): number => {
                return currentSortBy.compareFn(a, b);
            })
            .map((feed: UserFeedModel) => {
                return (
                    <Card
                        style={{ cursor: "pointer" }}
                        key={feed.title}
                        cover={
                            <Link href={`/feed/${feed.title}`}  >
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
                        <small>{feed.authorName}</small>
                    </Card>
                );
            });

    };
    // show loading
    return (
        <div className="UserFeeds">
            <section className="UserFeeds-header">

                <Radio.Group defaultValue={filter.toLowerCase()} buttonStyle="solid" onChange={handelFilterChange}>
                    {renderRadioButtons(submittedFeeds)}
                </Radio.Group>

                <Select defaultValue="title" onSelect={handelSortChange} style={{width: "8rem"}}>
                    {renderSortByOptions(sortBy)}
                </Select>
            </section>
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