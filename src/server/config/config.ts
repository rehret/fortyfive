import * as nconf from "nconf";

const env = process.env.NODE_ENV || "development";

nconf
    .argv()
    .env()
    .file("environmentConfig", `${__dirname}/${env}.json`)
    .file("defaultConfig", `${__dirname}/default.json`)
    .required(["PORT", "SESSION_KEY", "OAUTH_CLIENTID", "OAUTH_CLIENTSECRET", "OAUTH_CALLBACKURL"]);
