import { Controller, Get, Ctx, UseBefore } from "routing-controllers";
import { Log } from "../log";
import { IRouterContext } from "koa-router";
import * as nconf from "nconf";
import { Authenticate } from "../auth";

@Controller()
export class RootController {
    @UseBefore(Authenticate("/login"))
    @Get("/")
    public async Get(@Ctx() ctx: IRouterContext): Promise<string> {
        const user = ctx.state.user;
        Log.debug(user);

        const logoutRoute = nconf.get("PASSPORT_LOGOUT_ROUTE");

        return `
        <html>
            <body>
                <h1>Hello, ${user.displayName}!</h1>
                <div>
                    <a href='${logoutRoute}'>
                        Logout
                    </a>
                </div>
            </body>
        </html>`;
    }

    @Get("/login")
    public async Login(@Ctx() ctx: IRouterContext): Promise<string> {
        if (ctx.isAuthenticated()) {
            ctx.redirect("/");
        }

        const loginRoute = nconf.get("PASSPORT_LOGIN_ROUTE");

        return `<html><body><a href='${loginRoute}'>Log in with Google</a></body></html>`;
    }
}
