import { ProductCard } from "@/shared/product-card/product-card";

export const Popular = () => {
	return (
		<section className="max-w-7xl mx-auto px-4 py-12">
			<h3 className="text-2xl font-bold mb-6">Популярные товары</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{/* <ProductCard  />
				<ProductCard  />
				<ProductCard  />
				<ProductCard  /> */}
			</div>
		</section>
	);
};
