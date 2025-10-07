import { CartItem } from "@/shared/cart-item";
import { useCartStore } from "@/store/cart/cart-store";

export const Cart = () => {
	const { cart, increment, decrement } = useCartStore();

	if (!cart) return;

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<h1 className="text-2xl font-bold mb-6">🛒 Корзина</h1>

			{cart.cart.length === 0 ? (
				<p className="text-gray-500">Ваша корзина пуста</p>
			) : (
				<div className="w-full flex flex-col justify-between lg:flex-row gap-8">
					{/* Левая часть — товары */}
					<div className="flex-1 space-y-4">
						{cart.cart.map((item) => (
							<CartItem key={item.id} item={item} />
						))}
					</div>

					{/* Правая часть — итог */}
					<div className="w-full lg:w-1/3 border rounded-xl p-6 h-fit">
						<div className="flex flex-col gap-2 border-b pb-4 mb-4">
							{/* Вся строка */}
							<div className="flex flex-wrap justify-between items-center gap-4">
								<div className="text-gray-600">
									Ваш заказ:{" "}
									<span className="font-semibold">
										{cart.info.totalQuantity} товар
									</span>
								</div>

								{cart.info.discountPrice && (
									<div className="text-green-600 font-semibold">
										Ваша выгода: {cart.info.price - cart.info.discountPrice} ₽
									</div>
								)}

								<div className="text-2xl font-bold text-blue-600">
									Итого:{" "}
									<span>
										{cart.info.discountPrice
											? cart.info.discountPrice
											: cart.info.price}{" "}
										₽
									</span>
								</div>
							</div>
						</div>

						<button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 cursor-pointer">
							Перейти к оформлению
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
