import "./Subscription.css";
import { useCallback, useEffect, useState } from 'react'
import FeedFilter, { sortBy, SortByValue } from '../../components/FeedFilter/FeedFilter';
import FeedGridList from '../../components/FeedGridList/FeedGridList';
import { user } from '../../functions/user';
import { UserFeedModel } from '../../models/feeds';
import { Typography } from "antd";
const { Title } = Typography;

export const Subscription = () => {


    const [feeds, setFeeds] = useState<UserFeedModel[]>([])
    const [currentSortBy, setCurrentSortBy] = useState<SortByValue>(sortBy.title);


    const loadFeeds = useCallback(
        async () => {
            const feedsJson = await user.getSubscriptions();
            console.log(feedsJson);
            setFeeds(feedsJson);
        }, []
    );

    const onChangeFilter = (value: SortByValue) => {
        setCurrentSortBy(value);
    }

    useEffect(() => {
        loadFeeds();
    }, [loadFeeds])

    return (
        <div className="Subscription">
            <header>
                <Title>Subscription</Title>
            </header>
            <div className="Subscription-body">
                <section className="Subscription-header">
                    <FeedFilter onChange={onChangeFilter} />
                </section>
                <FeedGridList feeds={feeds} sortedBy={currentSortBy} />
            </div>
        </div>
    );
};


export default Subscription;
