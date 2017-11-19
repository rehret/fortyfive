import "./config/config";

import "reflect-metadata";

import * as koa from "koa";
import * as session from "koa-session";
import * as bodyParser from "koa-bodyparser";
import { useKoaServer } from "routing-controllers";
import * as nconf from "nconf";

import { Log } from "./log";
import { passport } from "./auth";

const app = new koa();

app.use(bodyParser());

app.keys = [nconf.get("SESSION_KEY")];
app.use(session({}, app));

app.use(passport.initialize());
app.use(passport.session());

useKoaServer(app, {
    controllers: [`${__dirname}/controllers/*.ts`],
    middlewares: [`${__dirname}/middleware/*.ts`],
    defaultErrorHandler: false
});

const port = nconf.get("PORT");
app.listen(port, () => {
    Log.info(`Listening on :${port}`);
});
