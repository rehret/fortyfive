import * as passport from "koa-passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import * as nconf from "nconf";
import { IRouterContext } from "koa-router";
import { KoaMiddlewareInterface } from "routing-controllers";

passport.use(new googleStrategy({
    clientID: nconf.get("OAUTH_CLIENTID"),
    clientSecret: nconf.get("OAUTH_CLIENTSECRET"),
    callbackURL: nconf.get("OAUTH_CALLBACKURL")
}, (accessToken: any, refreshToken: any, profile: any, cb: (err?: any, user?: any) => void) => {
    cb(null, {
        id: profile.id,
        displayName: profile.displayName
    });
}));

passport.serializeUser((user: any, done: (err: any, user: any) => void) => {
    done(null, user);
});

passport.deserializeUser((user: any, done: (err: any, user: any) => void) => {
    done(null, user);
});

class Authenticate implements KoaMiddlewareInterface {
    public async use(ctx: IRouterContext, next: (err?: any) => Promise<any>): Promise<any> {
        if (ctx.isAuthenticated()) {
            return await next();
        } else {
            ctx.redirect("/login");
        }
    }
}

export { passport, Authenticate };
