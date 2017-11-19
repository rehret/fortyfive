import { Controller, Get, UseBefore, Ctx, Redirect } from "routing-controllers";
import { IRouterContext } from "koa-router";
import { passport } from "../auth";
import { Routes } from "../constants/routes";
import { Auth } from "../constants/auth";

@Controller("/auth")
export class AuthController {
    @Get("/")
    @UseBefore(passport.authenticate(Auth.Strategy, {
        successRedirect: "/",
        failureRedirect: Routes.ClientLoginRoute
    }))
    public async Auth(): Promise<void> {
        return;
    }

    @Get("/login")
    @UseBefore(passport.authenticate(Auth.Strategy, {
        failureRedirect: Routes.ClientLoginRoute,
        scope: Auth.Scope,
        prompt: "select_account"
    }))
    public async Login(): Promise<void> {
        return;
    }

    @Get("/logout")
    @Redirect(Routes.ClientLoginRoute)
    public async Logout(@Ctx() ctx: IRouterContext): Promise<void> {
        ctx.logout();
        ctx.session = null;
    }
}
