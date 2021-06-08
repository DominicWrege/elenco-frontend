import React from "react";
import Episode from "../../models/episode";
import EpisodeItem from "../EpisodeItem/EpisodeItem";
import { Typography, List } from 'antd';

const { Title } = Typography;


interface Properties {
    episodes: Episode[]
}

const EpisodeList: React.FC<Properties> = ({ episodes }) => {
    return (
        <List
            size="large"
            header={<Title level={5}>Episodes</Title>}
            bordered
            dataSource={episodes}
            renderItem={item => <EpisodeItem key={item.id} episode={item}></EpisodeItem>}
        />
    );
}

export default EpisodeList;