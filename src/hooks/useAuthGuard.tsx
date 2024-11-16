import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const useAuthGuard = () => {
	const { user, loading } = useAuth();
	const location = useLocation();

	const ProtectRoute = ({ children }: { children: JSX.Element }) => {
		if (loading) {
			return <div>Loading...</div>;
		}
		if (!user) {
			return <Navigate to="/login" state={{ from: location }} replace />;
		}
		return children;
	};

	return { ProtectRoute };
};

export default useAuthGuard;
