import { Card, List, Tag, Input } from "antd";
import "./Categories.css";
import { useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import category from "../../functions/category";
import { Category } from "../../models/category";
export const Categories: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState<string>("");
	const fetchAll = useCallback(async () => {
		try {
			setCategories(await category.getAll());
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAll();
	}, [fetchAll, filter]);

	const renderItem = (item: Category) => {
		return (
			<List.Item>
				<Link href={`category/${item.description}`}>
					<Tag>{item.description}</Tag>
				</Link>
			</List.Item>
		);
	};

	const onSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setFilter(event.target.value.trim());
	};

	return (
		<div className="Categories">
			<Card title="Categories">
				<Input.Search
					placeholder="input search text"
					style={{ width: "16rem" }}
					allowClear
					onChange={onSearch}
				/>
				<List
					loading={loading}
					className="Categories-list"
					rowKey={(item) => item.id.toString()}
					dataSource={categories.filter((item) => {
						if (filter.length === 0) {
							return true;
						}
						return (
							item.description
								.toLocaleUpperCase()
								.indexOf(filter.toLocaleUpperCase()) !== -1
						);
					})}
					renderItem={renderItem}
				/>
			</Card>
		</div>
	);
};

export default Categories;
