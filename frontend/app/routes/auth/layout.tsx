import { Outlet, useNavigation } from "react-router";
import Card from "~/components/card";

const AuthLayout = () => {
	return (
		<div>
			<h1>Auth Section</h1>
			<Card>
			<Outlet /> 
			</Card>
		</div>
	);
};

export default AuthLayout;