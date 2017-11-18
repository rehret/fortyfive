import { Middleware, KoaMiddlewareInterface } from "routing-controllers";
import { IRouterContext } from "koa-router";
import * as shortId from "shortid";

@Middleware({ type: "before" })
export class RequestId implements KoaMiddlewareInterface {
    public async use(ctx: IRouterContext, next: (err?: any) => Promise<any>): Promise<any> {
        ctx.state.requestId = shortId.generate();
        return await next();
    }
}
