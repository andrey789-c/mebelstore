import { API_URL } from "@/entities/config";
import type { TOrderFormData } from "@/entities/models/schema";
import axios from "axios";

export const makeOrder = async (body: TOrderFormData) => {
	try {
		const res = await axios.post(`${API_URL}/order/create`, body, {
      withCredentials: true
    });

		return res.data;
	} catch (error) {
    console.error('Ошибка оформления заказа: ', error)
  }
};
