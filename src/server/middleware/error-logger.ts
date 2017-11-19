import { Middleware, KoaMiddlewareInterface } from "routing-controllers";
import { IRouterContext } from "koa-router";
import { Log } from "../log";

@Middleware({ type: "before" })
export class ErrorLogger implements KoaMiddlewareInterface {
    public async use(ctx: IRouterContext, next: (err?: any) => Promise<any>): Promise<any> {
        try {
            return await next();
        } catch (err) {
            Log.error({
                requestId: ctx.state.requestId
            }, "Server error");

            ctx.throw(err);
        }
    }
}
