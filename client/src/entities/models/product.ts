export interface IProductCard {
	id: number;
	slug: string;
	name: string;
	price: string;
	discount_price: string;
	images: string[];
	categoryId: number;
}

export interface ICategory {
	id: number;
	name: string;
	slug: string;
}

export interface IMeta {
	last_page: number;
	current_page: number | null;
}

export interface ICategoryProductsResponse {
	category: ICategory;
	products: IProductCard[];
	meta: IMeta
}
