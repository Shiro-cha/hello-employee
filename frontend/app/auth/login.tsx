import { useLoaderData } from "react-router";
import LoginForm from "../auth/forms/form-login";

const Login = () => {
	const data = useLoaderData(); // Access the data returned by the loader

	return (
		<>
    <h1 className="font-bold text-center text-gray-600 inline-block mb-5 w-full">
  Connexion à mon compte <span className="font-norman text-center text-blue-600 ">Hello-employee</span>
</h1>
      <LoginForm/>
		</>
	);
};

export default Login;