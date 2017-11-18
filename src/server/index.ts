import "./config/config";

import "reflect-metadata";

import { createKoaServer } from "routing-controllers";
import * as nconf from "nconf";
import { Log } from "./log";

import Controllers from "./controllers";
import Middleware from "./middleware";

const app = createKoaServer({
    routePrefix: "/api",
    controllers: Controllers,
    middlewares: Middleware,
    defaultErrorHandler: false
});

const port = nconf.get("PORT");
app.listen(port, () => {
    Log.info(`Listening on :${port}`);
});
