import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { IProductCard } from "@/entities/models/product";
import { useEffect, useState, type FC } from "react";
import cn from "clsx";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart/cart-store";
import { Link } from "react-router-dom";

interface IProductPopupProps {
	product: IProductCard;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const ProductPopup: FC<IProductPopupProps> = ({
	open,
	product,
	onOpenChange,
}) => {
	const [quantity, setQuantity] = useState(0);
	const [activeImage, setActiveImage] = useState(0);
	const { increment, cart } = useCartStore();

	useEffect(() => {
		if (!cart || !cart.cart) return;

		const cartProduct = cart.cart.find((p) => product.id === p.id);

		if (cartProduct) {
			setQuantity(cartProduct.quantity);
		}
	}, [product.id, cart]);

	const handleAddToCart = () => {
		increment(product.id);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl p-6 bg-white">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold mb-2">
						{product.name}
					</DialogTitle>
				</DialogHeader>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Галерея */}
					<div>
						<img
							src={product.images[activeImage]}
							alt={product.name}
							className="w-full h-64 object-cover rounded-xl mb-3 transition"
						/>
						<div className="flex gap-2 overflow-x-auto">
							{product.images.map((img, idx) => (
								<button
									key={idx}
									onClick={() => setActiveImage(idx)}
									className={cn(
										"w-16 h-16 rounded-lg overflow-hidden border transition",
										activeImage === idx
											? "border-blue-500"
											: "border-transparent hover:border-gray-300"
									)}
								>
									<img
										src={img}
										alt={`Image ${idx + 1}`}
										className="w-full h-full object-cover"
									/>
								</button>
							))}
						</div>
					</div>

					{/* Инфо + кнопка */}
					<div className="flex flex-col justify-between">
						<div>
							{+product.discount_price < +product.price ? (
								<div className="flex items-center gap-2 mb-3">
									<span className="text-3xl font-bold text-blue-600">
										{product.discount_price} ₽
									</span>
									<span className="text-gray-500 line-through text-lg">
										{product.price} ₽
									</span>
								</div>
							) : (
								<span className="text-3xl font-bold text-blue-600 mb-3">
									{product.price} ₽
								</span>
							)}
						</div>

						{quantity === 0 ? (
							<Button
								onClick={handleAddToCart}
								size="lg"
								className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
							>
								Добавить в корзину
							</Button>
						) : (
							<Button
								size="lg"
								className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
							>
								<Link to={'/cart'}>Перейти в корзину</Link>
							</Button>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
