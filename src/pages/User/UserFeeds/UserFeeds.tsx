import { Radio, RadioChangeEvent, Select, Typography } from "antd";
import "./UserFeeds.css";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { user } from "../../../functions/user";
import {
  FeedStatus,
  SubmittedFeeds,
  UserFeedModel,
} from "../../../models/feeds";
import FeedGridList from "../../../components/FeedGridList/FeedGridList";
import FeedFilter, {
  sortBy,
  SortByType,
  SortByValue,
} from "../../../components/FeedFilter/FeedFilter";
const { Title } = Typography;

function renderRadioButtons(
  submittedFeeds: SubmittedFeeds | null
): JSX.Element[] {
  return Object.keys(FeedStatus).map((status) => {
    let count = 0;
    if (submittedFeeds && submittedFeeds[status.toLowerCase()]) {
      count = submittedFeeds[status.toLowerCase()].length;
    }
    return (
      <Radio.Button key={status} value={status.toLowerCase()}>
        {status} ({count})
      </Radio.Button>
    );
  });
}

function renderSortByOptions(sortBy: SortByType): JSX.Element[] {
  return Object.entries(sortBy).map(([key, prop]: [string, any]) => {
    return (
      <Select.Option key={prop.name} value={key}>
        {prop.name}
      </Select.Option>
    );
  });
}

let submittedFeeds: SubmittedFeeds | null = null;

export const UserFeeds: React.FC = () => {
  const [feedsList, setFeedsList] = useState<UserFeedModel[]>([]);
  const [filter, setFilter] = useState<FeedStatus>(FeedStatus.Online);
  const [loading, setLoading] = useState(true);
  const [currentSortBy, setCurrentSortBy] = useState<SortByValue>(sortBy.title);

  const getFeeds = useCallback(async () => {
    try {
      const feeds: SubmittedFeeds = await user.getSubmittedFeeds();
      submittedFeeds = feeds;
      setFeedsList(feeds.online);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
  };

  // const handelSortChange = (
  // 	value: string | number | LabeledValue,
  // 	_option: any
  // ): void => {
  // 	// setCurrentSortBy(sortBy[value.toString()]);
  // };
  const onChangeFilter = (value: SortByValue) => {
    setCurrentSortBy(value);
  };

  // if (feedsList.length === 0) {
  // 	return (
  // 		<Card size="small" style={{ height: "fit-content" }} >
  // 			<p style={{ textAlign: "center" }}>It seems, that you have zero submitted Podcasts yet. <br></br>Here you can a < Link href="/new-feed" >submit new Podcast.</Link >
  // 			</p >
  // 			<Empty description="No Podcasts" />
  // 		</Card >);
  // }
  // show loading
  return (
    <div className="UserFeeds">
      <header>
        <Title>Submitted Feeds</Title>
      </header>
      <section className="UserFeeds-body">
        <section className="UserFeeds-header">
          <Radio.Group
            defaultValue={filter.toLowerCase()}
            buttonStyle="solid"
            onChange={handelFilterChange}
          >
            {renderRadioButtons(submittedFeeds)}
          </Radio.Group>
          <FeedFilter onChange={onChangeFilter} />
        </section>
        <FeedGridList
          feeds={feedsList}
          sortedBy={currentSortBy}
          loading={loading}
        />
      </section>
    </div>
  );
};

export default UserFeeds;
