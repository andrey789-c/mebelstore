import type { ICartProduct } from "@/store/cart/cart-model";
import { useCartStore } from "@/store/cart/cart-store";
import type { FC } from "react";

export interface ICartItemProps {
  item: ICartProduct
}

export const CartItem:FC<ICartItemProps> = ({item}) => {

  const { increment, decrement, } = useCartStore();

	return (
		<div
			key={item.id}
			className="flex items-center justify-between bg-white rounded-xl shadow p-4"
		>
			<div className="flex items-center gap-4">
				<img
					src={item.image}
					alt={item.name}
					className="w-16 h-16 object-cover rounded-lg"
				/>
				<div>
					<h2 className="font-semibold">{item.name}</h2>
					<p className="text-gray-500">{item.price} ₽</p>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<button
					onClick={() => decrement(item.id)}
					className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
				>
					-
				</button>
				<span className="w-8 text-center">{item.quantity}</span>
				<button
					onClick={() => increment(item.id)}
					className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
				>
					+
				</button>
			</div>
		</div>
	);
};
