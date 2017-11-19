import "./config/config";

import "reflect-metadata";

import { createKoaServer } from "routing-controllers";
import * as nconf from "nconf";
import { Log } from "./log";

const app = createKoaServer({
    routePrefix: "/api",
    controllers: [`${__dirname}/controllers/*.ts`],
    middlewares: [`${__dirname}/middleware/*.ts`],
    defaultErrorHandler: false,
    classTransformer: true
});

const port = nconf.get("PORT");
app.listen(port, () => {
    Log.info(`Listening on :${port}`);
});
