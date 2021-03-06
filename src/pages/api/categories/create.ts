import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

const API_URL = process.env.EXTERNAL_API_URL

export default withApiAuthRequired(async function createCategory(req, res) {
    const { accessToken } = await getAccessToken(req, res, { scopes: ["create:category"] });

    const body = req.body;

    await fetch(`${API_URL}/categories/create`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).send(err));
})
