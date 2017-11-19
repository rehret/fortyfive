import { Controller, Get, UseBefore, Ctx, Redirect } from "routing-controllers";
import { IRouterContext } from "koa-router";
import * as nconf from "nconf";
import { passport } from "../auth";

const strategy = nconf.get("PASSPORT_STRATEGY");
const scope = nconf.get("PASSPORT_SCOPE");

@Controller("/auth")
export class AuthController {
    @Get("/")
    @UseBefore(passport.authenticate(strategy, {
        successRedirect: "/",
        failureRedirect: nconf.get("LOGIN_ROUTE")
    }))
    public async Auth(): Promise<void> {
        return;
    }

    @Get("/login")
    @UseBefore(passport.authenticate(strategy, {
        failureRedirect: nconf.get("LOGIN_ROUTE"),
        scope,
        prompt: "select_account"
    }))
    public async Login(): Promise<void> {
        return;
    }

    @Get("/logout")
    @Redirect(nconf.get("CLIENT_LOGIN_ROUTE"))
    public async Logout(@Ctx() ctx: IRouterContext): Promise<void> {
        ctx.logout();
        ctx.session = null;
    }
}
