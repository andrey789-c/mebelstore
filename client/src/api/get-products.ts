import { API_URL } from "@/entities/config";
import type { ICategoryProductsResponse } from "@/entities/models/product";
import axios from "axios";

export const getProducts = async (slug: string) => {
	try {
		const res = await axios.get<ICategoryProductsResponse>(
			`${API_URL}/category/${slug}`
		);

		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				throw new Error('Категория не найдена');
			}
			
			throw new Error('Ошибка загрузки данных');
		}
		throw new Error('Неизвестная ошибка');
	}
};
