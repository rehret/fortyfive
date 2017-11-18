import { Middleware, KoaMiddlewareInterface } from "routing-controllers";
import { IRouterContext } from "koa-router";
import { Log } from "../log";

@Middleware({ type: "before" })
export class RequestLogger implements KoaMiddlewareInterface {
    public async use(ctx: IRouterContext, next: (err?: any) => Promise<any>): Promise<any> {
        Log.info({
            requestId: ctx.state.requestId,
            req: ctx.request
        }, "Request received");
        return await next();
    }
}
