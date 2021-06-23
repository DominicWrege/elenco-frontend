import { API_URL } from "../env";
import { Category, TopCategory } from "../models/category";
import { http } from "./http";

export namespace category {



    export async function getAll(): Promise<Category[]> {

        const resp = await http.get(`${API_URL}/categories`);
        const categories: TopCategory[] = await resp.json();

        // return categories
        //     .flatMap((item: TopCategory) => [{ id: item.id, description: item.description }, ...item.children])
        //     .sort((a, b) => a.description.localeCompare(b.description));
        return categories
            // .flatMap((item: TopCategory) => [{ id: item.id, description: item.description }, ...item.children])
            .sort((a, b) => a.description.localeCompare(b.description));
    }

    export function castCategories(
        categories: Map<string, Array<string>>
    ): TopCategory[] {
        let newCategories: TopCategory[] = [];
        const entries = Object.entries(categories);
        for (const [i, [topCategory, subCategory]] of entries.entries()) {
            newCategories.push({
                id: i,
                description: topCategory,
                children: subCategory.map((description) => {
                    return {
                        id: i + Math.round(Math.random() * 100),
                        description: description,
                    };
                }),
            });
        }
        return newCategories;
    };

}

export default category;