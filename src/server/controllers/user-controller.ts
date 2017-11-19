import { JsonController, UseBefore, Get, Ctx } from "routing-controllers";
import { Authenticate } from "../auth";
import { IRouterContext } from "koa-router";
import { Routes } from "../constants/routes";

@JsonController(Routes.ApiUserRoutePrefix)
@UseBefore(Authenticate())
export class UserController {
    @Get(Routes.Root)
    public async Get(@Ctx() ctx: IRouterContext): Promise<{id: number, displayName: string}> {
        return ctx.state.user;
    }
}
