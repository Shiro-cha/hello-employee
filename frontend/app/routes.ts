import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const authenticate = async () => {
  try {
    const token = Cookies.get("token"); // Using js-cookie to get the token

    const response = await fetch("http://127.0.0.1:8080/api/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    return await response.json();
  } catch (error) {
    toast.error("Session expirée, veuillez vous reconnecter.");
    window.location.href = "/login";
    return null;
  }
};

const fetchEmployees = async () => {
  try {
    const token = Cookies.get("token");

    const response = await fetch("http://127.0.0.1:8080/api/employees", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }

    return await response.json();
  } catch (error) {
    toast.error("Erreur lors de la récupération des employés.");
    return null;
  }
};

export default [
  index("routes/home.tsx"),
  route("about", "routes/about/about.tsx"),
  layout("routes/auth/layout.tsx", [
    route("login", "./auth/login.tsx", {
      loader: async () => {
        return { message: "Login page data loaded" };
      },
    }),
    route("register", "./auth/register.tsx", {
      loader: async () => {
        return { message: "Register page data loaded" };
      },
    }),
  ]),
  layout("routes/dash/layout.tsx", [
    route("dash/employees", "./dash/employees.tsx", {
      loader: async () => {
        const user = await authenticate();
        if (!user) {
          return { message: "Unauthorized access" };
        }

        const employees = await fetchEmployees();
        return { user, employees };
      },
    }),
	route("dash/qr", "./dash/qr.tsx", {
		loader: async () => {
		  const user = await authenticate();
		  if (!user) {
			return { message: "Unauthorized access" };
		  }
  
		
		},
	  }),
	  route("dash/settings", "./dash/settings.tsx", {
		loader: async () => {
		  const user = await authenticate();
		  if (!user) {
			return { message: "Unauthorized access" };
		  }
		},
	  }),
  ]),
];
