import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import DefaultLayout from "@/layouts/DefaultLayout";
import NotFound from "@/pages/NotFound";
import routes from "@/routes/routes";

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<DefaultLayout />}>
					{routes.map(({ component: Component, path }) => (
						<Route path={`/${path}`} element={<Component />} key={path} />
					))}
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default AppRoutes;
