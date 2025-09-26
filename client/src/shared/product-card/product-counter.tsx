import { memo, type FC } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface IProductCounterProps {
	quantity: number;
	onToggleCart: (type: "increment" | "decrement") => void;
}

export const ProductCounter: FC<IProductCounterProps> = memo(({
	quantity,
	onToggleCart,
}) => {
	return quantity === 0 ? (
		<Button
			onClick={() => onToggleCart("increment")}
			variant="outline"
			className="gap-1 h-[36px]"
		>
			<ShoppingCart className="w-4 h-4" />В корзину
		</Button>
	) : (
		<div className="flex items-center gap-2">
			<Button
				variant="outline"
				size="icon"
				onClick={() => onToggleCart("decrement")}
			>
				<Minus className="w-4 h-4" />
			</Button>
			<span className="w-6 text-center">{quantity}</span>
			<Button
				variant="outline"
				size="icon"
				onClick={() => onToggleCart("increment")}
			>
				<Plus className="w-4 h-4" />
			</Button>
		</div>
	);
});
