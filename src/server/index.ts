import "./config/config";

import "reflect-metadata";

import { createKoaServer } from "routing-controllers";
import * as nconf from "nconf";
import { Log } from "./log";

const app = createKoaServer({
    routePrefix: "/api",
    controllers: [`${__dirname}/controllers/*.[tj]s`],
    middlewares: [`${__dirname}/middleware/*.[tj]s`],
    defaultErrorHandler: false
});

const port = nconf.get("PORT");
app.listen(port, () => {
    Log.info(`Listening on :${port}`);
});
