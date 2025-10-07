import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function Header() {
	return (
		<header className="border-b">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<a href="/" className="text-2xl font-bold text-gray-800">
					<img src="/images/logo.png" alt="logo" className="w-[150px]" />
				</a>

				<nav className="hidden  md:flex gap-6 text-gray-600 font-medium max-md:hidden">
					<a href="/catalog" className="hover:text-gray-900">
						Каталог
					</a>
					{/* <a href="#" className="hover:text-gray-900">О нас</a>
          <a href="#" className="hover:text-gray-900 ">Контакты</a> */}
				</nav>

				<div className="flex items-center gap-3">
					<Input
						type="text"
						placeholder="Поиск..."
						className="w-48 h-[40px] pl-2 md:w-64"
					/>
					<Button
						size="icon"
						variant="outline"
						className="bg-transparent border-0 shadow-none"
					>
						<a href="/cart">
						<ShoppingCart className="h-5 w-5 bg-transparent border-0" />
						</a>
						
					</Button>
				</div>
			</div>
		</header> 
	);
}
