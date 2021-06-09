import React from "react";
import Episode from "../../models/episode";
import EpisodeItem from "../EpisodeItem/EpisodeItem";
import { Typography, List } from 'antd';
import { FeedShort } from "../../models/feeds";

const { Title } = Typography;


interface Properties {
    episodes: Episode[]
    feedMeta: FeedShort
}

const EpisodeList: React.FC<Properties> = ({ episodes, feedMeta }) => {
    return (
        <List
            size="large"
            header={<Title level={5}>Episodes</Title>}
            bordered
            dataSource={episodes}
            renderItem={item => <EpisodeItem key={item.id} episode={item} feedMeta={feedMeta}  ></EpisodeItem>}
        />
    );
}

export default EpisodeList;