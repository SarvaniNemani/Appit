var passport = require('passport'), OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://www.provider.com/oauth2/authorize',
    tokenURL: 'https://www.provider.com/oauth2/token',
    clientID: '123-456-789',
    clientSecret: 'shhh-its-a-secret',
    callbackURL: 'https://www.example.com/auth/provider/callback'
},
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate(... function (err, user) {
            done(err, user);
        });
    }
));

app.get('/auth/provider', passport.authenticate('provider'));
app.get('/auth/provider/callback',
    passport.authenticate('provider', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

app.get('/auth/provider',
    passport.authenticate('provider', { scope: 'email' })
);
app.get('/auth/provider',
    passport.authenticate('provider', { scope: ['email', 'sms'] })
);
<a href="/auth/provider">Log In with OAuth 2.0 Provider</a>
