import { Outlet } from "react-router";
import TopBar from "~/dash/components/topbar";
import Sidebar from "~/dash/components/sidebar";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import Cookies from "js-cookie"; // Importing js-cookie library

const AuthLayout = () => {
	const data = useLoaderData();
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
	const [username,setUsername] = useState("");

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const token = Cookies.get("token"); // Using js-cookie to get the token

				if (!token) {
					throw new Error("No token found");
				}

				const response = await fetch("http://127.0.0.1:8080/api/me", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.status === 401) {
					throw new Error("Unauthorized");
				}
				
					const user= await response.json();
					console.log("user",user)
					setUsername(user.username)
				
			} catch (error) {
				toast.error("Session expirée, veuillez vous reconnecter.");
				window.location.href = "/login";
			}
		};

		checkAuthentication();
	}, []);

	return (
		<>
			<div className="flex h-screen">
				<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<div className="flex-1 flex flex-col">
					<TopBar currentUser={username} />
					<div className="flex-1 overflow-y-auto bg-gray-100">
						<Outlet /> 
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthLayout;