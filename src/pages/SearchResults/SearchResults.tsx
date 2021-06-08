import { Button, Dropdown, Empty, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { DefaultParams, RouteComponentProps, useRoute } from "wouter";
import { API_URL } from "../../env";
import { http } from "../../functions/http";
import "./SearchResults.css";
import FeedResultCard from "../../components/FeedResultCard/FeedResultCard";
import { compareByDescription, FeedModel } from "../../models/feeds";
const { Title } = Typography;

export interface SearchProperties extends DefaultParams {
    query: string
}

const SearchResults: React.FC<RouteComponentProps<DefaultParams>> = () => {
    let [feeds, setResult] = useState<FeedModel[]>([]);

    const [_match, params] = useRoute<SearchProperties>("/search/:query");
    const [categoriesList, setCategoriesList] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // const providerValue = useMemo(() => ({ feeds, setFeeds }), [feeds, setFeeds]);


    const header = (): JSX.Element => {
        return (<header >
            <Select
                className="SearchResults-categories-list"
                mode="multiple"
                placeholder="Filter by Categories"
                value={selectedCategories}
                onChange={handleChange}
                size="middle"
                options={filteredOptions}
            ></Select>
        </header>)
    }

    const renderResults = (): JSX.Element[] | JSX.Element => {
        if (feeds.length === 0) {
            return (
                <div className="SearchResults-list SearchResults-list-empty">
                    <Title level={2}>No Results for query: {decodeURI(params?.query ?? "")}</Title>
                    <Empty description={false} />
                </div>
            );
        }
        const list = feeds
            .sort(compareByDescription)
            .filter((item: FeedModel) => {
                if (selectedCategories.length == 0) {
                    return true;
                } else {
                    return item.categories.some(cat => selectedCategories.includes(cat.description));
                };
            })
            .map((item: FeedModel) => <FeedResultCard key={item.id} feed={item} ></FeedResultCard>);

        return (
            <>
                {header()}
                {list}
            </>);
    };

    const doSearch = async (searchTerm: string): Promise<void> => {
        setCategoriesList([]);
        setSelectedCategories([]);
        const resp = await http.get(encodeURI(`${API_URL}/api/feeds/search?term=${searchTerm}`));
        const feeds_json: FeedModel[] = await resp.json();
        intoCategoriesList(feeds_json);
        setResult(feeds_json);
    };

    const intoCategoriesList = (feeds: FeedModel[]): void => {
        const categories = new Set<string>();
        feeds.forEach(feed => {
            feed.categories.forEach(category => {
                categories.add(
                    category.description
                )
            })
        })
        setCategoriesList(Array.from(categories));
    };
    const filteredOptions = categoriesList.filter(opt => !selectedCategories.includes(opt)).map(s => ({ value: s }));

    const handleChange = (selected: string[]): void => {
        setSelectedCategories(selected);
    };

    useEffect(() => {
        if (params?.query) {
            doSearch(params.query);
        }
    }, [params?.query]);

    return (
        <div className="SearchResults">
            <main className="SearchResults-list">
                {renderResults()}
            </main>
        </div>
    );
};


export default SearchResults;