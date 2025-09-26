import type { IProductCard } from "@/entities/models/product";
import { ProductCard } from "@/shared/product-card/product-card";
import type { FC } from "react";

interface IListProps {
	products: IProductCard[];
}

export const List: FC<IListProps> = ({ products }) => {
	return (
		<div className="grid grid-cols-4 gap-6">
			{products.map((product) => (
				<ProductCard product={product}/>
			))}
		</div>
	);
};
