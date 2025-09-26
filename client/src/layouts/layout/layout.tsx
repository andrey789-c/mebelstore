import type { FC, ReactNode } from "react";
import s from "./layout.module.scss";
import { Footer, Header } from "@/features";

interface ILayoutProps {
	children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};
