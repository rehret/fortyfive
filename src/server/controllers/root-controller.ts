import { Controller, Get, Ctx, UseBefore } from "routing-controllers";
import { Log } from "../log";
import { IRouterContext } from "koa-router";
import { Authenticate } from "../auth";

@Controller()
export class RootController {
    @UseBefore(Authenticate)
    @Get("/")
    public async Get(@Ctx() ctx: IRouterContext): Promise<string> {
        const user = ctx.state.user;
        Log.debug(user);
        return `
        <html>
            <body>
                <h1>Hello, ${user.displayName}!</h1>
                <div>
                    <a href='/auth/logout'>
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

        return "<html><body><a href='/auth/login'>Log in with Google</a></body></html>";
    }
}
