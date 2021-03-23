import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0';
// const API_URL = process.env.EXTERNAL_API_URL
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
            await handleCallback(req, res, {
                redirectUri: "https://devdeveloper-blog-98c0a9nq2-barnacledevelopments.vercel.app/"
            })
        } catch (error) {
            res.status(error.status || 400).end(error.message);
        }
    }
});