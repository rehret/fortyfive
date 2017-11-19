import { JsonController, Get, Ctx } from "routing-controllers";
import { IRouterContext } from "koa-router";

@JsonController("/api/health")
export class HealthController {
    @Get()
    public async Health(): Promise<boolean> {
        return true;
    }

    @Get("/error")
    public async ErrorHealth(@Ctx() ctx: IRouterContext): Promise<boolean> {
        const err = new Error("Error endpoint called");
        ctx.throw(418, err);
        throw err;
    }
}
