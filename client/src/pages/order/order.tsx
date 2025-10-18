import { makeOrder } from "@/api/make-order";
import { orderSchema, type TOrderFormData } from "@/entities/models/schema";
import { useCartStore } from "@/store/cart/cart-store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const OrderPage = () => {
	const { cart } = useCartStore();
	const router = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TOrderFormData>({
		resolver: yupResolver(orderSchema) as any,
	});

	const onSubmit = async (data: TOrderFormData) => {
		console.log(data);

		await makeOrder(data);
		router("/order/success");
	};

	if (!cart || !cart.cart.length) {
		return (
			<div className="max-w-3xl mx-auto py-16 text-center text-gray-600">
				<h2 className="text-2xl font-semibold mb-4">😔 Товары недоступны</h2>
				<p className="text-gray-500">
					Похоже, вы удалили все товары из корзины или она пуста.
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<h1 className="text-2xl font-bold mb-6">🧾 Оформление заказа</h1>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* Левая часть — форма */}
				<div className="flex-1 space-y-6">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="bg-white border rounded-xl p-6 shadow-sm space-y-4"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<input
									type="text"
									placeholder="Имя *"
									{...register("name")}
									className="border rounded-lg px-3 py-2 w-full"
								/>
								{errors.name && (
									<p className="text-red-500 text-sm mt-1">
										{errors.name.message}
									</p>
								)}
							</div>

							<div>
								<input
									type="tel"
									placeholder="Телефон *"
									{...register("phone")}
									className="border rounded-lg px-3 py-2 w-full"
								/>
								{errors.phone && (
									<p className="text-red-500 text-sm mt-1">
										{errors.phone.message}
									</p>
								)}
							</div>

							<div>
								<input
									type="text"
									placeholder="Город *"
									{...register("city")}
									className="border rounded-lg px-3 py-2 w-full"
								/>
								{errors.city && (
									<p className="text-red-500 text-sm mt-1">
										{errors.city.message}
									</p>
								)}
							</div>

							<div>
								<input
									type="text"
									placeholder="Улица *"
									{...register("street")}
									className="border rounded-lg px-3 py-2 w-full"
								/>
								{errors.street && (
									<p className="text-red-500 text-sm mt-1">
										{errors.street.message}
									</p>
								)}
							</div>

							<div>
								<input
									type="text"
									placeholder="Дом *"
									{...register("home")}
									className="border rounded-lg px-3 py-2 w-full"
								/>
								{errors.home && (
									<p className="text-red-500 text-sm mt-1">
										{errors.home.message}
									</p>
								)}
							</div>

							<div>
								<input
									type="text"
									placeholder="Квартира"
									{...register("flat")}
									className="border rounded-lg px-3 py-2 w-full"
								/>
							</div>
						</div>
					</form>

					{/* Упрощённая корзина */}
					<div className="bg-white border rounded-xl p-6 shadow-sm">
						<h2 className="text-lg font-semibold mb-4">🛒 Ваш заказ</h2>
						{cart.cart.length === 0 ? (
							<p className="text-gray-500">Корзина пуста</p>
						) : (
							<ul className="space-y-3">
								{cart.cart.map((item) => (
									<li
										key={item.id}
										className="flex justify-between items-center border-b pb-2"
									>
										<span className="text-gray-700">{item.name}</span>
										<span className="text-gray-600">
											{item.quantity} × {item.price} ₽
										</span>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

				{/* Правая часть — итог */}
				<div className="w-full lg:w-1/3 border rounded-xl p-6 h-fit bg-white shadow-sm">
					<div className="flex flex-col gap-2 border-b pb-4 mb-4">
						<div className="text-gray-600">
							Всего товаров:{" "}
							<span className="font-semibold">{cart.info.totalQuantity}</span>
						</div>

						{cart.info.discountPrice && (
							<div className="text-green-600 font-semibold">
								Ваша выгода: {cart.info.price - cart.info.discountPrice} ₽
							</div>
						)}

						<div className="text-2xl font-bold text-blue-600">
							Итого: <span>{cart.info.discountPrice ?? cart.info.price} ₽</span>
						</div>
					</div>

					<button
						onClick={handleSubmit(onSubmit)}
						disabled={isSubmitting}
						className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-70"
					>
						{isSubmitting ? "Отправка..." : "Оформить заказ"}
					</button>
				</div>
			</div>
		</div>
	);
};
