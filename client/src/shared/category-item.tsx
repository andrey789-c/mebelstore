import { Card, CardContent } from "@/components/ui/card";
import type { FC } from "react";

interface ICategoryItemProps {
	id: number;
	name: string;
	slug: string;
}

export const CategoryItem: FC<ICategoryItemProps> = ({ id, name, slug }) => {
	return (
		<Card className="cursor-pointer transition hover:shadow-md">
			<a href={`/catalog/${slug}`}>
				<CardContent className="flex flex-col items-center justify-center p-4 gap-2">
					<span className="text-sm font-medium text-center">{name}</span>
				</CardContent>
			</a>
		</Card>
	);
};
