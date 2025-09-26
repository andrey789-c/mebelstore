import type { ICategory } from "@/entities/models/product";

export interface ICartStore {
	cart: ICart | null;
	error: boolean;
	loading: boolean;
}

export interface ICartActions {
  getCart: () => Promise<void>;
  increment: (id: number) => Promise<void>;
  decrement: (id: number) => Promise<void>;
  remove: (id: number) => Promise<void>;
  clear: () => Promise<void>;
}

export type ICartStoreWithActions = ICartStore & ICartActions;

export interface ICart {
	cart: ICartProduct[];
	info: ICartInfo;
}

export interface ICartInfo {
	price: number;
	discountPrice: number;
	totalQuantity: number;
}

export interface ICartProduct {
	id: number;
	name: string;
	price: string;
	category: ICategory;
	discount_price: string;
	quantity: number;
}
