import { o as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { n as getAuth } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-Bx8lgN4r.js
var auth = getAuth(initializeApp({
	apiKey: void 0,
	authDomain: void 0,
	projectId: void 0,
	appId: void 0
}));
//#endregion
export { auth as t };
