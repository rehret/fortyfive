import * as nconf from "nconf";

const env = process.env.NODE_ENV || "development";

nconf
    .argv()
    .env()
    .file("environmentConfig", `${__dirname}/${env}.json`)
    .file("defaultConfig", `${__dirname}/default.json`)
    .use("embeddedConfig", {
        type: "literal",

        "PASSPORT_STRATEGY": "google",
        "PASSPORT_SCOPE": "https://www.googleapis.com/auth/plus.me",
        "PASSPORT_LOGIN_ROUTE": "/auth/login",
        "PASSPORT_LOGOUT_ROUTE": "/auth/logout",
        "CLIENT_LOGIN_ROUTE": "/login"
    })
    .required(["PORT", "SESSION_KEY", "OAUTH_CLIENTID", "OAUTH_CLIENTSECRET", "OAUTH_CALLBACKURL"]);
