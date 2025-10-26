import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { memo, useCallback, useEffect, useState, type FC } from "react";
import { ProductCounter } from "./product-counter";
import type { IProductCard } from "@/entities/models/product";
import { useCartStore } from "@/store/cart/cart-store";
import { ProductPopup } from "@/features/product-popup/product-popup";

interface IProductCardProps {
	product: IProductCard;
}

export const ProductCard: FC<IProductCardProps> = memo(({ product }) => {
	const [quantity, setQuantity] = useState(0);
	const [isOpen, setIsOpen] = useState(false)

	const { cart, increment, decrement } = useCartStore();

	useEffect(() => {
		if (!cart || !cart.cart) return;

		const cartProduct = cart.cart.find((p) => product.id === p.id);

		if (cartProduct) {
			setQuantity(cartProduct.quantity);
		}
	}, [product.id, cart]);

	const onToggleCart = useCallback(async (type: "increment" | "decrement") => {
		if (type === "increment") {
			await increment(product.id);
		} else {
			await decrement(product.id);
		}
	}, []);

	return (
		<>
			<Card className="rounded-2xl shadow hover:shadow-lg transition pt-0 overflow-hidden">
				<CardHeader className="bg-gray-200">
					<img
						src={product.images[0]}
						alt={product.name}
						className="rounded-t-2xl w-full h-48 object-cover "
					/>
				</CardHeader>

				<CardContent className="p-4">
					<h4 onClick={() => setIsOpen(true)} className="font-semibold text-lg mb-3 line-clamp-2 h-12 leading-tight">
						{product.name}
					</h4>

					<div className="mt-auto flex justify-between items-center">
						{+product.discount_price < +product.price ? (
							<div className="font-bold text-blue-600 text-2xl">
								{product.discount_price}
								<span className="font-bold text-gray-500 text-[14px] line-through ml-1">
									{product.price}
								</span>
							</div>
						) : (
							<span className="font-bold text-2xl text-blue-600">
								{product.price} ₽
							</span>
						)}

						<ProductCounter quantity={quantity} onToggleCart={onToggleCart} />
					</div>
				</CardContent>
			</Card>

			<ProductPopup open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} product={product}/>
		</>
	);
});
