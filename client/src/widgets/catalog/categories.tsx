import type { ICategory } from "@/entities/models/product";
import { CategoryItem } from "@/shared/category-item";
import type { FC } from "react";

interface ICategoriesProps {
	categories: ICategory[];
}

export const Categories: FC<ICategoriesProps> = ({ categories }) => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
			{categories.map((category) => (
				<CategoryItem
					key={category.id}
					id={category.id}
					name={category.name}
					slug={category.slug}
				/>
			))}
		</div>
	);
};
