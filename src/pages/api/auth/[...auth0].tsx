import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
    async login(req, res) {
        try {
            await handleLogin(req, res, {
                authorizationParams: {
                    audience: `http://localhost:5000/`, // or AUTH0_AUDIENCE
                    // Add the `offline_access` scope to also get a Refresh Token
                    scope: 'openid profile email create:category delete:category update:category create:post update:post delete:post create:comment delete:comment', // or AUTH0_SCOPE
                    response_type: "code"
                },

            });

        } catch (error) {
            res.status(error.status || 400).end(error.message);
        }
    }
});