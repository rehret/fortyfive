import { Controller, UseBefore, Get, Ctx } from "routing-controllers";
import { Authenticate } from "../auth";
import { IRouterContext } from "koa-router";

@Controller("/api/user")
@UseBefore(Authenticate())
export class UserController {
    @Get()
    public async Get(@Ctx() ctx: IRouterContext): Promise<{id: number, displayName: string}> {
        return ctx.state.user;
    }
}
