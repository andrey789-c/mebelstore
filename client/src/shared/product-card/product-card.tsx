import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { memo, useCallback, useState, type FC } from "react";
import { ProductCounter } from "./product-counter";
import type { IProductCard } from "@/entities/models/product";

interface IProductCardProps {
	product: IProductCard;
}

export const ProductCard: FC<IProductCardProps> = memo(({ product }) => {
	const [quantity, setQuantity] = useState(0);

	const onToggleCart = useCallback((type: "increment" | "decrement") => {
		setQuantity((prev) =>
			type === "increment" ? prev + 1 : Math.max(prev - 1, 0)
		);
	}, []);

	return (
		<Card className="rounded-2xl shadow hover:shadow-lg transition pt-0 overflow-hidden" >
			<CardHeader className="bg-gray-200">
				<img
					src={product.images[0]}
					alt={product.name}
					className="rounded-t-2xl w-full h-48 object-cover "
				/>
			</CardHeader>

			<CardContent className="p-4">
				<h4 className="font-semibold text-lg mb-3 line-clamp-2 h-12 leading-tight">{product.name}</h4>
				{/* <p className="text-sm text-gray-600">{product}</p> */}
				<div className="mt-auto flex justify-between items-center">
					{+product.discount_price < +product.price ? (
						<div className="font-bold text-blue-600 text-2xl" >
							{product.discount_price}
							<span className="font-bold text-gray-500 text-[14px] line-through ml-1">
								{product.price}
							</span>
						</div>
					) : (
						<span className="font-bold text-2xl text-blue-600">{product.price} ₽</span>
					)}

					<ProductCounter quantity={quantity} onToggleCart={onToggleCart} />
				</div>
			</CardContent>
		</Card>
	);
});
