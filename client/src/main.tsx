import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./path";
import { Layout } from "./layouts";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-loading-skeleton/dist/skeleton.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<Layout>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</Layout>
);
