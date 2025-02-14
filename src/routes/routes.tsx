import New from "@/pages/campaign/New";
import Home from "@pages/Home";

type RouteType = {
	path: string;
	component: () => React.JSX.Element;
	exact: boolean;
};

const routes: RouteType[] = [
	{
		path: "/",
		component: Home,
		exact: true,
	},
	{
		path: "/campaign/new",
		component: New,
		exact: true,
	},
];

export default routes;
