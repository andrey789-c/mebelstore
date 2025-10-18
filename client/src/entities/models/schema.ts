import * as yup from "yup";

export const orderSchema = yup.object({
	name: yup.string().required().min(2, "Введите имя"),
	phone: yup
		.string()
		.required()
		.matches(/^\+?\d{10,15}$/, "Введите корректный номер телефона"),
	city: yup.string().required().min(2, "Введите город"),
	street: yup.string().required().min(2, "Введите улицу"),
	home: yup.string().required().min(1, "Введите номер дома"),
	flat: yup.string().optional(),
});

export type TOrderFormData = yup.InferType<typeof orderSchema>;
