import { create } from "zustand";
import type { ICartStoreWithActions, ICart } from "./cart-model";
import { combine, persist } from "zustand/middleware";
import { getCart, incrementProductCart, decrementProductCart, removeProductCart, clearCart } from "./cart-api";

const useCartStore = create<ICartStoreWithActions>()(
	persist(
		combine({ cart: null as ICart | null, error: false, loading: false }, (set, _get) => ({
			getCart: async () => {
				try {
          set({loading: true})
					const res = await getCart()
					set({ cart: res, loading: false });
				} catch (error) {
					console.error('Ошибка получения корзины:', error);
          set({ error: true, loading: false });
				}
			},
			increment: async (id: number) => {
				try {
					set({ loading: true, error: false });
					const res = await incrementProductCart(id);
					set({ cart: res, loading: false });
				} catch (error) {
					console.error('Ошибка увеличения количества:', error);
					set({ error: true, loading: false });
				}
			},
			decrement: async (id: number) => {
				try {
					set({ loading: true, error: false });
					const res = await decrementProductCart(id);
					set({ cart: res, loading: false });
				} catch (error) {
					console.error('Ошибка уменьшения количества:', error);
					set({ error: true, loading: false });
				}
			},
			remove: async (id: number) => {
				try {
					set({ loading: true, error: false });
					const res = await removeProductCart(id);
					set({ cart: res, loading: false });
				} catch (error) {
					console.error('Ошибка удаления товара:', error);
					set({ error: true, loading: false });
				}
			},
			clear: async () => {
				try {
					set({ loading: true, error: false });
					await clearCart();
					set({ cart: null, loading: false });
				} catch (error) {
					console.error('Ошибка очистки корзины:', error);
					set({ error: true, loading: false });
				}
			}
		})),
		{
			name: "cartStore",
		}
	)
);

export { useCartStore };
