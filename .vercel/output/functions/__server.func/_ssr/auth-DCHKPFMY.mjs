//#region node_modules/.nitro/vite/services/ssr/assets/auth-DCHKPFMY.js
var AUTH_KEY = "sah-auth";
function getAuthUser() {
	try {
		const raw = localStorage.getItem(AUTH_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function setAuthUser(user) {
	localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}
function clearAuthUser() {
	localStorage.removeItem(AUTH_KEY);
}
function isAuthenticated() {
	return getAuthUser() !== null;
}
//#endregion
export { isAuthenticated as n, setAuthUser as r, clearAuthUser as t };
