import { JsonController, UseBefore, Get, Ctx } from "routing-controllers";
import { Authenticate } from "../auth";
import { IRouterContext } from "koa-router";

@JsonController("/api/user")
@UseBefore(Authenticate())
export class UserController {
    @Get()
    public async Get(@Ctx() ctx: IRouterContext): Promise<{id: number, displayName: string}> {
        return ctx.state.user;
    }
}
