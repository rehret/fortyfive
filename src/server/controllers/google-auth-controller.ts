import { Controller, Get, UseBefore, Ctx, Redirect } from "routing-controllers";
import { IRouterContext } from "koa-router";
import { passport } from "../auth";
import { Routes } from "../constants/routes";
import { Auth } from "../constants/auth";

@Controller(Routes.GoogleRoutePrefix)
export class GoogleAuthController {
    @Get(Routes.Root)
    @UseBefore(passport.authenticate(Auth.Strategy, {
        successRedirect: Routes.Root,
        failureRedirect: Routes.ClientLoginRoute
    }))
    public async Auth(): Promise<void> {
        return;
    }

    @Get(Routes.GoogleLoginRoute)
    @UseBefore(passport.authenticate(Auth.Strategy, {
        failureRedirect: Routes.ClientLoginRoute,
        scope: Auth.Scope,
        prompt: "select_account"
    }))
    public async Login(): Promise<void> {
        return;
    }

    @Get(Routes.GoogleLogoutRoute)
    @Redirect(Routes.ClientLoginRoute)
    public async Logout(@Ctx() ctx: IRouterContext): Promise<void> {
        ctx.logout();
        ctx.session = null;
    }
}
