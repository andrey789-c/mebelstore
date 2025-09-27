import { useEffect, type FC, type ReactNode } from "react";
import { Footer, Header } from "@/features";
import { useCartStore } from "@/store/cart/cart-store";

interface ILayoutProps {
	children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
	const { getCart } = useCartStore();

	useEffect(() => {
		getCart();
	}, []);

	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};
