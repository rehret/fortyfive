import * as passport from "koa-passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import * as nconf from "nconf";
import { IRouterContext, IMiddleware } from "koa-router";

passport.use(new googleStrategy({
    clientID: nconf.get("OAUTH_CLIENTID"),
    clientSecret: nconf.get("OAUTH_CLIENTSECRET"),
    callbackURL: `${nconf.get("OAUTH_CALLBACKBASEURL")}/auth/google`
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

function Authenticate(unauthorizedRedirectPath?: string): IMiddleware {
    return async function use(ctx: IRouterContext, next: (err?: any) => Promise<any>): Promise<any> {
        if (ctx.isAuthenticated()) {
            return await next();
        } else {
            if (typeof unauthorizedRedirectPath === "string") {
                ctx.redirect(unauthorizedRedirectPath);
            } else {
                ctx.throw(401);
            }
        }
    };
}

export { passport, Authenticate };
