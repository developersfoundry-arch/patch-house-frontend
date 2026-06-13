//#region node_modules/.nitro/vite/services/ssr/assets/api-DU9Ccmp7.js
var BASE = "";
async function request(path, init) {
	const res = await fetch(`${BASE}/api/v1${path}`, {
		...init,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...init?.headers
		}
	});
	if (res.status === 401) {
		localStorage.removeItem("sah-auth");
		window.location.href = "/login";
		throw new Error("Unauthorized");
	}
	const data = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);
	return data;
}
var api = {
	get: (path) => request(path),
	post: (path, body) => request(path, {
		method: "POST",
		body: JSON.stringify(body)
	}),
	put: (path, body) => request(path, {
		method: "PUT",
		body: JSON.stringify(body)
	}),
	del: (path) => request(path, { method: "DELETE" })
};
//#endregion
export { api as t };
