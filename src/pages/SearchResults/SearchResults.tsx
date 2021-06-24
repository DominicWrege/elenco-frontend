import { Empty, Select, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DefaultParams, RouteComponentProps, useRoute } from "wouter";
import { API_URL } from "../../env";
import { http } from "../../functions/http";
import "./SearchResults.css";
import FeedResultCard from "../../components/FeedResultCard/FeedResultCard";
import { compareByDescription, FeedEpisodeModel } from "../../models/feeds";
const { Title } = Typography;

export interface SearchProperties extends DefaultParams {
  query: string;
}

const SearchResults: React.FC<RouteComponentProps<DefaultParams>> = () => {
  let [feeds, setResult] = useState<FeedEpisodeModel[]>([]);

  const params = useRoute<SearchProperties>("/search/:query")[1];
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const header = (): JSX.Element => {
    return (
      <header>
        <Select
          className="SearchResults-categories-list"
          mode="multiple"
          placeholder="Filter by Categories"
          value={selectedCategories}
          onChange={handleChange}
          size="middle"
          options={filteredOptions}
        ></Select>
      </header>
    );
  };

  const renderResults = (): JSX.Element[] | JSX.Element => {
    if (feeds.length === 0) {
      return (
        <div className="SearchResults-list SearchResults-list-empty">
          <Title level={2}>
            No Results for query: {decodeURI(params?.query ?? "")}
          </Title>
          <Empty description={false} />
        </div>
      );
    }
    const list = feeds
      .sort(compareByDescription)
      .filter((item: FeedEpisodeModel) => {
        if (selectedCategories.length === 0) {
          return true;
        } else {
          return item.categories.some((cat) =>
            selectedCategories.includes(cat.description)
          );
        }
      })
      .map((item: FeedEpisodeModel) => (
        <FeedResultCard key={item.id} feed={item}></FeedResultCard>
      ));

    return (
      <>
        {header()}
        {list}
      </>
    );
  };

  const doSearch = useCallback(async (): Promise<void> => {
    if (params?.query) {
      setCategoriesList([]);
      setSelectedCategories([]);
      const resp = await http.get(
        encodeURI(`${API_URL}/feeds/search?term=${params?.query}`)
      );
      const feeds_json: FeedEpisodeModel[] = await resp.json();
      intoCategoriesList(feeds_json);
      setResult(feeds_json);
    }
  }, [params?.query]);

  const intoCategoriesList = (feeds: FeedEpisodeModel[]): void => {
    const categories = new Set<string>();
    feeds.forEach((feed) => {
      feed.categories.forEach((category) => {
        categories.add(category.description);
      });
    });
    setCategoriesList(Array.from(categories));
  };
  const filteredOptions = categoriesList
    .filter((opt) => !selectedCategories.includes(opt))
    .map((s) => ({ value: s }));

  const handleChange = (selected: string[]): void => {
    setSelectedCategories(selected);
  };

  useEffect(() => {
    doSearch();
  }, [doSearch]);

  return (
    <div className="SearchResults">
      <section className="SearchResults-list">{renderResults()}</section>
    </div>
  );
};

export default SearchResults;
