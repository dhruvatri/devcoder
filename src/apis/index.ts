import axios from "axios";

// File for exporting all the APIs
export const runnerUrl = axios.create({
	baseURL: "https://emkc.org/api/v2/piston",
});
