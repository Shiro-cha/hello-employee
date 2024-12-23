import { useLoaderData } from "react-router";
import RegisterForm from "../auth/forms/form-register";

const Register = () => {
	const data = useLoaderData(); // Access the data returned by the loader

	return (
		<>
      <RegisterForm/>
		</>
	);
};

export default Register;