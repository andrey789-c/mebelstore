import { getCatalog } from "@/api/get-catalog";
import { Categories } from "@/widgets/catalog/categories";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";

const Catalog = () => {
	const categories = useQuery("categories", getCatalog);


	if (categories.isLoading)
		return (
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div
					className="grid grid-cols-3 gap-6"
					style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
				>
					<Skeleton className="w-full" height={100} />
					<Skeleton className="w-full" height={100} />
					<Skeleton className="w-full" height={100} />
				</div>
			</div>
		);

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<Categories categories={categories.data || []} />
		</div>
	);
};

export default Catalog;
