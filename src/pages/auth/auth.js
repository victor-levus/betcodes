import axios from "axios";

// export const BASEURL =
//   process.env.NODE_ENV === "production"
//     ? "https://backendapiapp-f7e6af207af9.herokuapp.com/api/"
//     : "http://127.0.0.1:8000/api/";

export const BASEURL = "https://backendapiapp-f7e6af207af9.herokuapp.com/api/";

const BASE_URL = BASEURL + "auth/";

// console.log(process.env.NODE_ENV);

const addHeader = (access_token) => {
	axios.defaults.headers.common["Authorization"] = `JWT ${access_token}`;
};

export const removeHeader = async () => {
	axios.defaults.headers.common = {};
};

export const registerUser = async (body) => {
	const objectBody = { ...body, username: body.email };
	try {
		const result = await axios.post(BASE_URL + "users/", objectBody);
		return result;
	} catch (error) {
		return error?.response;
	}
};

export const loginUser = async (body) => {
	const objectBody = { username: body.email, password: body.password };
	try {
		const result = await axios.post(BASE_URL + "jwt/create/", objectBody);
		localStorage.setItem("token", result.data.access);
		localStorage.setItem("refresh", result.data.refresh);
		addHeader(result.data.access);
		// localStorage.setItem("token2", result.data.access + "badtoken");
		return result;
	} catch (error) {
		return error?.response;
	}
};

export const loginWithToken = async () => {
	const token = localStorage.getItem("token");
	const refresh = localStorage.getItem("refresh");

	if (token) {
		try {
			const verifyToken = await axios.post(BASE_URL + "jwt/verify/", { token });
			addHeader(token);
			return true;
		} catch (error) {
			try {
				const newToken = await axios.post(BASE_URL + "jwt/refresh/", {
					refresh,
				});
				addHeader(newToken.data.access);
				localStorage.setItem("token", newToken.data.access);

				return true;
			} catch (error) {
				removeHeader();
				localStorage.removeItem("token");
				localStorage.removeItem("refresh");
			}
		}
	} else {
		removeHeader();
	}
};
