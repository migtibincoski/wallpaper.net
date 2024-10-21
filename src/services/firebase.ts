import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const app = initializeApp({
	apiKey: "AIzaSyAkHaUfzVfHX30DnPddDnQd8tc866v-jVg",
	authDomain: "wallpaper-net-oficial.firebaseapp.com",
	projectId: "wallpaper-net-oficial",
	storageBucket: "wallpaper-net-oficial.appspot.com",
	messagingSenderId: "753874825120",
	appId: "1:753874825120:web:6b28a9fc35d647225dfec5",
	measurementId: "G-TCZCE3MF2M",
});

const analytics = getAnalytics(app);
let auth = getAuth(app) as any;
auth.errorMessages = {};
auth = auth as Auth;
const db = getFirestore(app);

connectAuthEmulator(
	auth,
	`${window.location.protocol}//${window.location.hostname}:9099`
);
connectFirestoreEmulator(
	db,
	`${window.location.protocol}//${window.location.hostname}`,
	9199
);

auth.useDeviceLanguage();
auth.errorMessages = {
	"auth/claims-too-large":
		"The claims data you provided is too big. It can't exceed 1,000 bytes.",
	"auth/email-already-exists":
		"This email is already in use by another user. Each user needs a unique email address.",
	"auth/id-token-expired": "The Firebase ID token you provided has expired.",
	"auth/id-token-revoked":
		"The Firebase ID token you provided has been revoked.",
	"auth/insufficient-permission":
		"The credentials used to set up the Admin SDK don't have permission to access this Authentication resource. Please refer to the documentation on how to generate credentials with the right permissions.",
	"auth/internal-error":
		"An unexpected error occurred on the Authentication server while processing your request. The error message will include more details. If the issue continues, please report it through our Bug Report support channel.",
	"auth/invalid-argument":
		"You provided an invalid argument for an Authentication method. Check the error message for more details.",
	"auth/invalid-claims": "The custom claims you provided are invalid.",
	"auth/invalid-continue-uri": "The continue URL you provided is not valid.",
	"auth/invalid-creation-time":
		"The creation time you provided is not a valid UTC date string.",
	"auth/invalid-credential":
		"The credentials used for the Admin SDK cannot perform this action. Some methods, like createCustomToken() and verifyIdToken(), require a certificate credential. Please check the documentation on how to set this up.",
	"auth/invalid-disabled-field":
		"The value for the user's disabled property is invalid. It must be a boolean (true or false).",
	"auth/invalid-display-name": "The display name must be a non-empty text.",
	"auth/invalid-dynamic-link-domain":
		"The dynamic link domain you provided is not set up or authorized for your project.",
	"auth/invalid-email":
		"The email you provided is invalid. Please enter a valid email address.",
	"auth/invalid-email-verified":
		"The emailVerified property must be a boolean value (true or false).",
	"auth/invalid-hash-algorithm":
		"The hash algorithm must be one of the supported options.",
	"auth/invalid-hash-block-size": "The hash block size must be a valid number.",
	"auth/invalid-hash-derived-key-length":
		"The derived key length for the hash must be a valid number.",
	"auth/invalid-hash-key": "The hash key must be a valid byte buffer.",
	"auth/invalid-hash-memory-cost":
		"The hash memory cost must be a valid number.",
	"auth/invalid-hash-parallelization":
		"The hash parallelization must be a valid number.",
	"auth/invalid-hash-rounds": "The number of hash rounds must be valid.",
	"auth/invalid-hash-salt-separator":
		"The salt separator for the hash must be a valid byte buffer.",
	"auth/invalid-id-token": "The ID token you provided is not valid.",
	"auth/invalid-last-sign-in-time":
		"The last sign-in time must be a valid UTC date string.",
	"auth/invalid-page-token":
		"The next page token in listUsers() is invalid. It must be a valid non-empty string.",
	"auth/invalid-password": "The password must be at least six characters long.",
	"auth/invalid-password-hash":
		"The password hash must be a valid byte buffer.",
	"auth/invalid-password-salt":
		"The password salt must be a valid byte buffer.",
	"auth/invalid-phone-number":
		"The phone number must be a valid string that follows the E.164 format.",
	"auth/invalid-photo-url": "The photo URL you provided is not valid.",
	"auth/invalid-provider-data":
		"The providerData must be a valid array of UserInfo objects.",
	"auth/invalid-provider-id":
		"The providerId must be a valid string identifier.",
	"auth/invalid-oauth-responsetype":
		"Only one OAuth response type should be set to true.",
	"auth/invalid-session-cookie-duration":
		"The session cookie duration must be a number between 5 minutes and 2 weeks.",
	"auth/invalid-uid":
		"The uid must be a non-empty string with a maximum of 128 characters.",
	"auth/invalid-user-import":
		"The user record you are trying to import is invalid.",
	"auth/maximum-user-count-exceeded":
		"You have exceeded the maximum number of users you can import.",
	"auth/missing-android-pkg-name":
		"You need to provide an Android package name for app installation.",
	"auth/missing-continue-uri":
		"You must provide a valid continue URL in your request.",
	"auth/missing-hash-algorithm":
		"You need to provide a hash algorithm and its parameters to import users with password hashes.",
	"auth/missing-ios-bundle-id": "You need to provide a bundle ID for iOS.",
	"auth/missing-uid": "A uid identifier is required for this operation.",
	"auth/missing-oauth-client-secret":
		"You must provide the OAuth client secret key to enable the OIDC code flow.",
	"auth/operation-not-allowed":
		"The login provider you are trying to use is disabled for this Firebase project. Enable it in the Sign-in method section of the Firebase Console.",
	"auth/phone-number-already-exists":
		"This phone number is already associated with another user. Each user must have a unique phone number.",
	"auth/project-not-found":
		"No Firebase project was found with the credentials used to set up the Admin SDKs. Refer to the documentation on how to generate the correct credentials for your project.",
	"auth/reserved-claims":
		"One or more custom claims you provided are reserved. For example, avoid using OIDC-specific claims like sub, iat, iss, exp, aud, auth_time, etc.",
	"auth/session-cookie-expired":
		"The Firebase session cookie you provided has expired.",
	"auth/session-cookie-revoked":
		"The Firebase session cookie has been revoked.",
	"auth/too-many-requests":
		"You have made too many requests in a short period.",
	"auth/uid-already-exists":
		"This uid is already in use by another user. Each user must have a unique uid.",
	"auth/unauthorized-continue-uri":
		"The confirmation URL domain is not on the whitelist. Please add it in the Firebase Console.",
	"auth/user-disabled":
		"Your account has been disabled. Please contact support for more information.",
	"auth/user-not-found":
		"We couldn't find your account. Have you already created your account?",
	"auth/email-already-in-use":
		"The email address is already in use. If this is your email address, don't you wanna try log in?",
};

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".firebase-emulator-warning")?.remove();
});

export { analytics, auth, db };
