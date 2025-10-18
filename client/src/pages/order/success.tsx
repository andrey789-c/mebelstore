import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const SuccessPage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
			<motion.div
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: "spring", stiffness: 150, damping: 15 }}
				className="mb-6"
			>
				<CheckCircle2 className="text-green-500 w-20 h-20" />
			</motion.div>

			<motion.h1
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="text-3xl font-bold mb-2"
			>
				Спасибо за ваш заказ!
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className="text-gray-600 max-w-md mb-8"
			>
				Мы свяжемся с вами в ближайшее время для подтверждения заказа.  
				Проверьте, что ваш телефон включён 📱
			</motion.p>

			<motion.button
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				onClick={() => navigate("/")}
				className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
			>
				Вернуться на главную
			</motion.button>
		</div>
	);
};
