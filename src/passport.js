import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";

import { facebookLoginCallback, githubLoginCallback } from "./controller/videoController";
import User from "./models/User";
import routes from "./routers";

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID:process.env.GH_ID,
    clientSecret:process.env.GH_SECRET,
    callbackURL: process.env.PRODUCTION
    ? `https://polar-sea-27980.herokuapp.com${routes.githubCallback}`
    : `http://localhost:4000${routes.githubCallback}`

}, githubLoginCallback))

passport.use(new FacebookStrategy({
    clientID:process.env.FB_ID,
    clientSecret:process.env.FB_SECRET,
    callbackURL: process.env.PRODUCTION
    ? `https://polar-sea-27980.herokuapp.com${routes.githubCallback}`
    : `http://localhost:4000${routes.githubCallback}`

}, facebookLoginCallback))

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
    done(err, user);
    });
    });