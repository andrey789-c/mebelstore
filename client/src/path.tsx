import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home/home";
import Catalog from "./pages/catalog/catalog";
import Category from "./pages/catalog/[slug]/page";
import { Cart } from "./pages/cart/cart";

export const router = createBrowserRouter([
	{ path: "/", element: <HomePage /> },
	{ path: "/catalog", element: <Catalog /> },
	{ path: "/catalog/:slug", element: <Category /> },
	{ path: "/cart", element: <Cart /> },
]);
