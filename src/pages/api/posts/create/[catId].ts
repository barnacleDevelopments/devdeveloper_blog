import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

const API_URL = process.env.EXTERNAL_API_URL

export default withApiAuthRequired(async function createPost(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res, { scopes: ["create:post"] });
        const catId = req.query.catId
        const body = req.body;

        await fetch(`${API_URL}/posts/create/${catId}`, {
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
            .then(data => {
                console.log(data)
                res.status(200).json(data);
            }).catch(err => {
                console.log(err)
            })

    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
})
