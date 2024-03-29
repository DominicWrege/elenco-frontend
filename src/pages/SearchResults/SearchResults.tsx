import { Button, Empty, List, Select, Typography } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { DefaultParams, Link, RouteComponentProps, useRoute } from "wouter";
import "./SearchResults.css";
import FeedResultCard from "../../components/FeedResultCard/FeedResultCard";
import { FeedEpisodeModel } from "../../models/feeds";
import { feed } from "../../functions/feed";
import { UserContext } from "../../contexts/UserContext";
const { Title } = Typography;

export interface SearchProperties extends DefaultParams {
	query: string;
}

const SearchResults: React.FC<RouteComponentProps<DefaultParams>> = () => {
	let [feeds, setResult] = useState<FeedEpisodeModel[]>([]);
	const [loading, setLoading] = useState(true);
	const userContext = useContext(UserContext);

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
		if (!loading && feeds.length === 0) {
			return (
				<div className="SearchResults-list SearchResults-list-empty">
					<Title level={2}>
						No search results for "{decodeURI(params?.query ?? "")}"
					</Title>
					{userContext?.user && (
						<Link href="/new/feed">
							<Button type="link">Add a new podcast.</Button>
						</Link>
					)}
					<Empty description={false} />
				</div>
			);
		}

		return (
			<>
				{header()}
				<List
					loading={loading}
					rowKey={(feed) => feed.id.toString()}
					dataSource={feeds.filter((item: FeedEpisodeModel) => {
						if (selectedCategories.length === 0) {
							return true;
						} else {
							return item.categories.some((cat) =>
								selectedCategories.includes(cat.description)
							);
						}
					})}
					renderItem={(item) => (
						<List.Item>
							<FeedResultCard key={item.id} feed={item}></FeedResultCard>
						</List.Item>
					)}
				/>
			</>
		);
	};

	const doSearch = useCallback(async (): Promise<void> => {
		if (params?.query) {
			setCategoriesList([]);
			setSelectedCategories([]);
			setLoading(true);
			try {
				const feeds_json = await feed.search(params?.query);
				intoCategoriesList(feeds_json);
				setResult(feeds_json);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		}
	}, [params?.query]);

	const intoCategoriesList = (feeds: FeedEpisodeModel[]): void => {
		const categories = new Set<string>();
		feeds.forEach((feed) => {
			feed.categories.forEach((category) => {
				categories.add(category.description);
			});
		});
		setCategoriesList(
			Array.from(categories).sort((a: string, b: string) => a.localeCompare(b))
		);
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
