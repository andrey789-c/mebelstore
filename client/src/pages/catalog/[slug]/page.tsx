import { getProducts } from "@/api/get-products";
import { List } from "@/widgets/catalog";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Category = () => {
	const { slug } = useParams();

	const category = useQuery({
		queryKey: ["products"],
		queryFn: () => getProducts(slug as string),
	});

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<List products={category.data?.products || []} />
		</div>
	);
};

export default Category;
