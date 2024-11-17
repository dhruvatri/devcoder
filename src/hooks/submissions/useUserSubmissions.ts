import { useQuery } from "react-query";
import { getUserSubmissions } from "../../services/submissions";
import { db } from "../../utils/firebase";

export const useUserSubmissions = (userId: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ["userSubmissions", userId],
		queryFn: () => getUserSubmissions({ userId, db }),
	});
	return { data, isLoading };
};
